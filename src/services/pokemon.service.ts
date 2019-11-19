import { Request, Response } from "express";
import { WELCOME } from "../constants/pokeApi.constants";

export class PokeService {
    public welcomeMessage(req: Request, res: Response) {
        return res.status(200).send(WELCOME);
    }
}