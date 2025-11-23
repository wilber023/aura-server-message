
const Joi = require('joi');
const Group = require('../entities/Group');
const Participant = require('../entities/Participant');
const ParticipantRole = require('../value-objects/ParticipantRole');

class GroupService {
  constructor(groupRepository) {
    this.groupRepository = groupRepository;
  }

  /**
   * Crea un grupo validando tipo, lógica y sanitización
   */
  async createGroup({ name, createdBy, members }) {
    // Validación de tipo y lógica de negocio
    const schema = Joi.object({
      name: Joi.string().min(3).max(100).required(),
      createdBy: Joi.string().uuid().required(),
      members: Joi.array().items(Joi.string().uuid()).min(1).required()
    });
    const { error } = schema.validate({ name, createdBy, members });
    if (error) throw new Error('Datos de grupo inválidos: ' + error.message);

    // Sanitización básica
    const sanitizedName = name.replace(/[<>"'`]/g, '');

    // Crear entidad grupo y participantes
    const group = new Group(null, sanitizedName, createdBy, 'group');
    const participants = members.map(id => Participant.create(id, id === createdBy ? 'admin' : 'member'));

    // Guardar en repositorio (persistencia)
    const saved = await this.groupRepository.save(group, participants);
    return saved;
  }
}

module.exports = GroupService;
