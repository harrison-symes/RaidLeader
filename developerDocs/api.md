# Raid Leader Web API documentation

## Endpoints Menu

###  Authentication

| Method | Path | Auth Required | Purpose | Response | Further Info |
| --- | --- | --- | --- | --- | --- |
| POST | /api/auth/register | No | To Register and then log In a New User | User Token | [Info](#Register) |
| POST | /api/auth/login | No | To Login an already registered User | User Token | [Info](#Register)

### Dungeons

| Method | Path | Auth Required | Purpose | Response | Further Info |
| --- | --- | --- | --- | --- | --- |
| GET | /api/dungeons | Yes | Receive an Array of Dungeons from the 'dungeons' table | Array of Dungeon Objects | [Info](#Dungeons)|
| POST | /api/dungeons/complete | Yes | To mark a user as having completed a dungeon | Status Code| [Info](#Complete_Dungeon) |

### Recruits

| Method | Path | Auth Required | Purpose | Response | Further Info |
| --- | --- | --- | --- | --- | --- |
| GET | /api/recruits | Yes | Receive an Array of Recruits (that are 'owned' by the User making the Request) from the 'recruits' table | An Array of Recruit Objects | [Info](#Get_Recruits) |
| POST | /api/recruits | Yes | Add a new Recruit to the 'recruits' table | The Recruit that was added (as an Object) | [Info](#Add_Recruit)|
| PUT | /api/recruits/weapons | YES | Equip a Weapon to a Recruit (table table relation from 'recruits' to 'inventory') | Status Code | [Info](#Equip_Recruit_Weapon)|
| PUT | /api/recruits/level | Yes | Change the Level of a Recruit in the database | The Recruit (with the level updated) as an Object | [Info](#Level_Update_Recruit) |

## Register
-
-
-
-
-
-
-


## Login

-
-
-
-
-
-
-

## Get Dungeons

-
-
-
-
-
-
-

## Complete Dungeon

-
-
-
-
-
-
-
