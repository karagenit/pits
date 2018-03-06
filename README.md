# Pit Display

FRC Team Information Pit Display

Basically, this is just a simple webpage which pulls match data from TBA and displays it.

## Setup

Requires a TBA Read key in `tba.token`.

## API

Example match data:

```
[
  {
    "key": "string",
    "comp_level": "qm",
    "set_number": 0,
    "match_number": 0,
    "alliances": {
      "blue": {
        "score": 0,
        "team_keys": [
          "string"
        ],
        "surrogate_team_keys": [
          "string"
        ],
        "dq_team_keys": [
          "string"
        ]
      },
      "red": {
        "score": 0,
        "team_keys": [
          "string"
        ],
        "surrogate_team_keys": [
          "string"
        ],
        "dq_team_keys": [
          "string"
        ]
      }
    },
    "winning_alliance": "string",
    "event_key": "string",
    "time": 0,
    "actual_time": 0,
    "predicted_time": 0,
    "post_result_time": 0,
    "score_breakdown": {},
    "videos": [
      {
        "key": "string",
        "type": "string"
      }
    ]
  }
]
```
