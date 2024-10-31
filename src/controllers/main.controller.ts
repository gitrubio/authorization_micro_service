import { Request, Response } from 'express';
import STATUS_CODES from '../constants';
import RunwayML from '@runwayml/sdk';
import config from '../config';
import { io } from '../index';

const client = new RunwayML({ apiKey: config.RUNWAYML_API_SECRET });


export const generateVideo = async (req: Request, res: Response) => {
	try {
		const { image } = req.body;

		if (!image) return res.status(STATUS_CODES.BAD_REQUEST).json({ error: 'No se ha proporcionado una imagen' });

		console.log('Generating video...');

		// Create a new image-to-video task using the "gen3a_turbo" model
		const imageToVideo = await client.imageToVideo.create({
			model: 'gen3a_turbo',
			// Point this at your own image file
			promptImage: image,
			promptText: 'a video of a futuristic city with flying cars',
		});

		const taskId = imageToVideo.id;



		console.log('Task complete:', taskId);

		res.status(STATUS_CODES.OK).json({ taskId });
		setImmediate(async () => {
			let task: Awaited<ReturnType<typeof client.tasks.retrieve>>;
			do {
				// Wait for ten seconds before polling
				await new Promise(resolve => setTimeout(resolve, 10000));

				task = await client.tasks.retrieve(taskId);
			} while (!['SUCCEEDED', 'FAILED'].includes(task.status));
			console.log('Task complete:', task);
			io.emit('yalagenere', task);
		});
	} catch (error) {
		res.status(STATUS_CODES.BAD_REQUEST).json({ error: 'Error al obtener datos de la API de RunwayML' });
	}
}