import { Request, Response } from "express";
import { MongooseDocument } from 'mongoose';

import { WELCOME } from "../constants/pokeApi.constants";
import { Pokemon } from "../models/pokemon.model";

export class PokeService {
    public welcomeMessage(req: Request, res: Response) {
        return res.status(200).send(WELCOME);
    }

    public getAllPokemon(req: Request, res: Response) {
        Pokemon.find({}, (error: Error, pokemon: MongooseDocument) => {
            if (error)
                res.send(error);
            res.json(pokemon);
        });
    }

    public addNewPokemon(req: Request, res: Response) {
        const newPokemon = new Pokemon(req.body);
        newPokemon.save((error: Error, pokemon: MongooseDocument) => {
            if (error)
                res.send(error);
            res.json(pokemon);
        });
    }

    public deletePokemon(req: Request, res: Response) {
        const pokemonID = req.params.id;
        Pokemon.findByIdAndDelete(pokemonID, (error: Error, deleted: any) => {
            if (error)
                res.send(error);
            const message = deleted ? 'Deleted successfully' : 'Pokemon not found :(';
            res.send(message);
        });
    }

    public updatePokemon(req: Request, res: Response) {
        const pokemonId = req.params.id;
        Pokemon.findByIdAndUpdate(
            pokemonId,
            req.body,
            (error: Error, pokemon: any) => {
                if (error)
                    res.send(error);
                const message = pokemon
                    ? 'Updated successfully'
                    : 'Pokemon not found :(';
                res.send(message);
            }
        );
    }
}