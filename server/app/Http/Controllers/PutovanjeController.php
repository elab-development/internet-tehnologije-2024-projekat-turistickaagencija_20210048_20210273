<?php

namespace App\Http\Controllers;

use App\Http\Resources\PutovanjeResurs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PutovanjeController extends ResponseController
{
    public function index(Request $request): \Illuminate\Http\JsonResponse
    {
        $putovanja = \App\Models\Putovanje::all();

        return $this->usepsno(PutovanjeResurs::collection($putovanja), 'Putovanja su uspešno učitana.');
    }

    public function unesiPutovanje(Request $request): \Illuminate\Http\JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'nazivPutovanja' => 'required|string|max:255',
            'opis' => 'required|string',
            'lokacija' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return $this->neuspesno('Validacija nije uspela.', $validator->errors());
        }

        $putovanje = \App\Models\Putovanje::create([
            'nazivPutovanja' => $request->nazivPutovanja,
            'opis' => $request->opis,
            'lokacija' => $request->lokacija,
        ]);

        return $this->usepsno(new PutovanjeResurs($putovanje), 'Putovanje je uspešno uneseno.');
    }

    public function obrisiPutovanje($id): \Illuminate\Http\JsonResponse
    {
        $putovanje = \App\Models\Putovanje::find($id);

        if (!$putovanje) {
            return $this->neuspesno('Putovanje nije pronađeno.');
        }

        $putovanje->delete();

        return $this->usepsno([], 'Putovanje je uspešno obrisano.');
    }
}
