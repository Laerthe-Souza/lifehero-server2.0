import { Request, Response } from 'express';

import { CreateIncidentService } from '../services/incidents/CreateIncidentService';
import { DeleteIncidentService } from '../services/incidents/DeleteIncidentService';
import { ListIncidentsService } from '../services/incidents/ListIncidentsService';
import { Incident } from '../views/Incident';

export class IncidentsController {
  async index(request: Request, response: Response) {
    const listIncidents = new ListIncidentsService();

    const incidents = await listIncidents.execute();

    return response.custom(200, Incident, incidents);
  }

  async create(request: Request, response: Response) {
    const { id } = request.user;
    const { title, description, value } = request.body;
    const images = request.files as Express.Multer.File[];

    const createIncident = new CreateIncidentService();

    const incident = await createIncident.execute({
      title,
      description,
      value,
      images,
      ongId: id,
    });

    return response.custom(201, Incident, incident);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const deleleIncident = new DeleteIncidentService();

    await deleleIncident.execute(id);

    return response
      .status(204)
      .json({ message: 'Incident deleted successfully' });
  }
}
