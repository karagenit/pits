# Pit Display

FRC Team Information Pit Display

Basically, this is just a simple webpage which pulls match data from TBA and displays it.

## Setup

Requires a TBA Read key in `tba.token`.

## Backend

There's a ruby gem for the blue alliance API, or we could use something like nodejs.

## API

We could have a webpage `/events` which queries `/team/frc868/events/2018` which lists each event by name and provides a link to `/event/KEY` based on the key returned by the API. Then, going to `/event/KEY` would query `/team/frc868/events/KEY/matches` and lists all matches (including #, teams, time, and score if it's a previous match).
