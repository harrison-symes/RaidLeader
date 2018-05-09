# Raid Leader Web API documentation

## Endpoints Menu

###  Authentication

| Method | Path | Auth Required | Purpose | Response | Further Info |
| --- | --- | --- | --- | --- | --- |
| POST | /api/auth/register | No | To Register and then log In a New User | User Token | [Info](#register-new-user) |
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

### player

| Method | Path | Auth Required | Purpose | Response | Further Info |
| --- | --- | --- | --- | --- | --- |
| GET | /api/player/gold | Yes | Receive the amount of gold the Requesting user has in the database | Integer representing gold | [Info](#Get_Gold)|
| PUT | /api/player/gold | Yes | Remove or Add gold to/from the Requesting user | Status Code | [Info](#Put_Gold)|
| GET | /api/player/weapons | Yes | Get a list of Weapons that the Requesting Player has collected | An Array of Weapon Objects | [Info](#Get_Weapons) |
| POST | /api/player/weapons | Yes | Add a Weapon to the 'inventory' table, with the Requesting User as a relation | The Weapon that was added as an Object | [Info](#Post_Weapon) |
| DELETE | /api/player/weapons | Yes | Remove a weapon from the 'inventory' table, and add gold to the Requesting User based on the Weapon's value | Status Code | [Info](#Delete_Weapon) |
| POST | /api/player/getStarted | Yes | Get a User started after they complete the tutorial, creating their first weapons, recruit and spell in the database | The Recruit, Spell and Weapon added, as objects within and Object | [Info](#Post_Started) |
| GET | /api/player/experience | Yes | Get the total experience the Requesting User has accrued | Integer value representing Experience | [Info](#Get_Experience) |
| PUT | /api/player/experience | Yes | Add experience to the Requesting User | Status Code | [Info](#Put_Experience) |
| GET | /api/player/gems | Yes | Get the number of Gems that the Requesting User has accrued | Integer value representing Gems | [Info](#Get_Gems) |
| PUT | /api/player/gems | Yes | Add or Remove gems from a User | Status Code | [Info](#Get_Gems) |
| GET | /api/player/traits | Yes | Get the list of "traits" that a User has learned (from the 'traits' table) | An Array of Traits as Objects | [Info](#Get_Traits) |

### spells

| Method | Path | Auth Required | Purpose | Response | Further Info |
| --- | --- | --- | --- | --- | --- |
| GET | /api/spells | Yes | Receive the list of Spells from the 'spells' table, that the requesting User has "learned" | An Array of Spell Objects | [Info](#Get_Spells) |
| POST | /api/spells | Yes | Add a Spell to the 'spells' table, related to the Requesting User (For when a Player 'learns' a Spell) | The Spell that was learned, as an Object | [Info](#Post_Spell) |
| DELETE | /api/spells | Yes | Delete a spell from the 'spells' table by the spell name | Status Code | [Info](#Delete_Spell) |

---
### Register New User

| Method | Endpoint | Authentication Required | Usage | Response |
| --- | --- | --- | --- | --- |
| POST | /api/auth/register | No | To Register and then log In a New User | User Token |

#### Request Body

```
{
  user_name: 'Submitted-Username',
  password: 'submitted-password'
}
```

#### Response

##### Status Codes:
  | Status Code | Meaning | Success |
  | --- | --- | --- |
  | 200 | The Register was successful | True |
  | 400 | UserName already taken | False |
  | 500 | Server Error | False |

##### Response Body

Success:
```
  {
    token: JWT-TOKEN
  }
```

User Name Taken:
```
  {
    message: 'User Name Already Taken'
  }
```

([back to summary](#summary))  

---

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
