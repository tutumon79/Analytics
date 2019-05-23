import { Ingradient } from './ingradient.model';

export class Recipie {
    name: string;
    description: string;
    imagePath: string;
    ingradients: Ingradient[];

    constructor(name: string, description: string, imagePath: string, ingradients: Ingradient[]) {
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
        this.ingradients = ingradients;
    }
}
