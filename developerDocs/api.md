# Raid Leader Web API documentation

## Endpoints Menu

### [Authentication](#authentication)

| Method | Path | Auth Required | Purpose | Response | Further Info |
| --- | --- | --- | --- | --- | --- |
| POST | /api/v1/auth/register | No | To Register and then log In a New User | User Token | [Info](#register-new-user) |
| POST | /api/v1/auth/login | No | To Login an already registered User | User Token | [Info](#login-user)

### [Dungeons](#dungeons)

| Method | Path | Auth Required | Purpose | Response | Further Info |
| --- | --- | --- | --- | --- | --- |
| GET | /api/v1/dungeons | Yes | Receive an Array of Dungeons from the 'dungeons' table | Array of Dungeon Objects | [Info](#get-dungeons)|
| POST | /api/v1/dungeons/complete | Yes | To mark a user as having completed a dungeon | Status Code| [Info](#complete-dungeon) |

### [Recruits](#dungeons)

| Method | Path | Auth Required | Purpose | Response | Further Info |
| --- | --- | --- | --- | --- | --- |
| GET | /api/v1/recruits | Yes | Receive an Array of Recruits (that are 'owned' by the User making the Request) from the 'recruits' table | An Array of Recruit Objects | [Info](#get-recruits) |
| POST | /api/v1/recruits | Yes | Add a new Recruit to the 'recruits' table | The Recruit that was added (as an Object) | [Info](#add-recruit)|
| PUT | /api/v1/recruits/weapons | YES | Equip a Weapon to a Recruit (table table relation from 'recruits' to 'inventory') | Status Code | [Info](#equip-recruit-weapon)|
| PUT | /api/v1/recruits/level | Yes | Change the Level of a Recruit in the database | The Recruit (with the level updated) as an Object | [Info](#update-recruit-level) |

### [Player](#player)

| Method | Path | Auth Required | Purpose | Response | Further Info |
| --- | --- | --- | --- | --- | --- |
| GET | /api/v1/player/gold | Yes | Receive the amount of gold the Requesting user has in the database | Integer representing gold | [Info](#Get_Gold)|
| PUT | /api/v1/player/gold | Yes | Remove or Add gold to/from the Requesting user | Status Code | [Info](#Put_Gold)|
| GET | /api/v1/player/weapons | Yes | Get a list of Weapons that the Requesting Player has collected | An Array of Weapon Objects | [Info](#Get_Weapons) |
| POST | /api/v1/player/weapons | Yes | Add a Weapon to the 'inventory' table, with the Requesting User as a relation | The Weapon that was added as an Object | [Info](#Post_Weapon) |
| DELETE | /api/v1/player/weapons | Yes | Remove a weapon from the 'inventory' table, and add gold to the Requesting User based on the Weapon's value | Status Code | [Info](#Delete_Weapon) |
| POST | /api/v1/player/getStarted | Yes | Get a User started after they complete the tutorial, creating their first weapons, recruit and spell in the database | The Recruit, Spell and Weapon added, as objects within and Object | [Info](#Post_Started) |
| GET | /api/v1/player/experience | Yes | Get the total experience the Requesting User has accrued | Integer value representing Experience | [Info](#Get_Experience) |
| PUT | /api/v1/player/experience | Yes | Add experience to the Requesting User | Status Code | [Info](#Put_Experience) |
| GET | /api/v1/player/gems | Yes | Get the number of Gems that the Requesting User has accrued | Integer value representing Gems | [Info](#Get_Gems) |
| PUT | /api/v1/player/gems | Yes | Add or Remove gems from a User | Status Code | [Info](#Get_Gems) |
| GET | /api/v1/player/traits | Yes | Get the list of "traits" that a User has learned (from the 'traits' table) | An Array of Traits as Objects | [Info](#Get_Traits) |

### spells

| Method | Path | Auth Required | Purpose | Response | Further Info |
| --- | --- | --- | --- | --- | --- |
| GET | /api/v1/spells | Yes | Receive the list of Spells from the 'spells' table, that the requesting User has "learned" | An Array of Spell Objects | [Info](#Get_Spells) |
| POST | /api/v1/spells | Yes | Add a Spell to the 'spells' table, related to the Requesting User (For when a Player 'learns' a Spell) | The Spell that was learned, as an Object | [Info](#Post_Spell) |
| DELETE | /api/v1/spells | Yes | Delete a spell from the 'spells' table by the spell name | Status Code | [Info](#Delete_Spell) |

## Authentication

---
### Register New User

| Method | Endpoint | Authentication Required | Usage | Response |
| --- | --- | --- | --- | --- |
| POST | /api/v1/auth/register | No | To Register and then log In a New User | User Token |

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
    message: 'Authentication Successful'
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
### Login User

| Method | Endpoint | Authentication Required | Usage | Response |
| --- | --- | --- | --- | --- |
| POST | /api/v1/auth/login | No | Log In an Existing User | User Token |

#### Request Body

```
{
  user_name: 'existing-username',
  password: 'existing-password'
}
```

#### Response

##### Status Codes:
  | Status Code | Meaning | Success |
  | --- | --- | --- |
  | 200 | The Login was successful | True |
  | 400 | User Does Not Exist / Password is incorrect | False |
  | 500 | Server Error | False |

##### Response Body

Success:
```
  {
    message: 'Authentication Successful'
    token: JWT-TOKEN
  }
```

Failure:
```
  {
    message: 'Error Message'
  }
```

([back to summary](#summary))  

---

## Dungeons

### Get Dungeons


| Method | Endpoint | Authentication Required | Usage | Response |
| --- | --- | --- | --- | --- |
| GET | /api/v1/dungeons | Yes | Receive an Array of Dungeons from the 'dungeons' table | Array of Dungeon Objects |

#### Response

##### Status Codes:
  | Status Code | Meaning | Success |
  | --- | --- | --- |
  | 200 | The Request was successful | True |
  | 500 | Server Error | False |

##### Response Body

Success:
```
  [
    {
      "id": 1,
      "name": "The Hunt",
      "description": "The Paladin knows the location of a dying Dragon. Dragons are pretty scary, but they always hoard a large amount of treasure. Hopefully this Dragon won't live long enough to burn you alive...",
      "requires_complete": null,
      "max_party": 1,
      "max_spells": 1,
      "level": 1,
      "is_repeatable": 0,
      "gold_reward": 500,
      "rewards": "[]",
      "isCompleted": true
    },
    ...
  ]
```

Failure:
```
  {
    message: 'Error Message'
  }
```

([back to summary](#summary))  

---

### Complete Dungeon

| Method | Endpoint | Authentication Required | Usage | Response |
| --- | --- | --- | --- | --- |
| POST | /api/v1/dungeons/complete | Yes | To mark a user as having completed a dungeon | Status Code |

#### Request

#### Request Body

```
{
  dungeon_id: 1
}
```

#### Response

##### Status Codes:
  | Status Code | Meaning | Success |
  | --- | --- | --- |
  | 201 | The Request successfully created an item | True |
  | 500 | Server Error | False |

---

## Recruits


### Get Recruits

| Method | Endpoint | Authentication Required | Usage | Response |
| GET | /api/v1/recruits | Yes | Receive an Array of Recruits (that are 'owned' by the User making the Request) from the 'recruits' table | An Array of Recruit Objects |
| --- | --- | --- | --- | --- |

#### Response

##### Status Codes:
  | Status Code | Meaning | Success |
  | --- | --- | --- |
  | 200 | The Request was successful | True |
  | 500 | Server Error | False |

#### Response Body

```
  [
    {
        "id": 1,
        "name": "Patrick",
        "heroClass": "Paladin",
        "level": 3,
        "weapon_id": 3,
        "user_id": 1,
        "zodiac": "Aries"
    },
    ...
  ]
```

Failure:
```
  {
    message: 'Error Message'
  }
```

([back to summary](#summary))  

---

## Add Recruit

| Method | Endpoint | Authentication Required | Usage | Response |
| --- | --- | --- | --- | --- |
| POST | /api/v1/recruits | Yes | Add a new Recruit to the 'recruits' table | The Recruit that was added (as an Object) |

#### Request

##### Request Body

```
{
  name: 'Patty',
  zodiac: 'Aries',
  heroClass: 'Paladin'
}
```

#### Response

##### Status Codes:
  | Status Code | Meaning | Success |
  | --- | --- | --- |
  | 201 | The Request successfully created an entry | True |
  | 500 | Server Error | False |


#### Response Body

```
  {
    "id": 2,
    "name": "Patty",
    "heroClass": "Paladin",
    "level": 1,
    "weapon_id": null,
    "user_id": 1,
    "zodiac": "Aries"
  }
```

([back to summary](#summary))  

---

### Equip Recruit Weapon

| Method | Endpoint | Authentication Required | Usage | Response |
| --- | --- | --- | --- | --- |
| PUT | /api/v1/recruits/weapons | YES | Equip a Weapon to a Recruit (table table relation from 'recruits' to 'inventory') | Status Code |

#### Request

##### Request Body

```
{
  id: 1,
  weapon_id: 2
}
```

#### Response

##### Status Codes:
  | Status Code | Meaning | Success |
  | --- | --- | --- |
  | 202 | The Request successfully updated the entry | True |
  | 500 | Server Error | False |


([back to summary](#summary))  

---

### Update Recruit Level

| Method | Endpoint | Authentication Required | Usage | Response |
| --- | --- | --- | --- | --- |
| PUT | /api/v1/recruits/level | Yes | Change the Level of a Recruit in the database | The Recruit (with the level updated) as an Object |

#### Request

##### Request Body

```
{
  id: 1,
  level: 2
}
```

#### Response

##### Status Codes:
  | Status Code | Meaning | Success |
  | --- | --- | --- |
  | 202 | The Request successfully updated the entry | True |
  | 500 | Server Error | False |

##### Response Body

```
  {
    {
      "id": 1,
      "name": "Patrick",
      "heroClass": "Paladin",
      "level": 2,
      "weapon_id": null,
      "user_id": 1,
      "zodiac": "Aries"
    }
  }
```

([back to summary](#summary))  

---

## Player

### Get Player Gold

| Method | Endpoint | Authentication Required | Usage | Response |
| GET | /api/v1/player/gold | Yes | Receive the amount of gold the Requesting user has in the database | Integer representing gold |
| --- | --- | --- | --- | --- |

#### Response

##### Status Codes:
  | Status Code | Meaning | Success |
  | --- | --- | --- |
  | 200 | The Request was successful | True |
  | 500 | Server Error | False |

#### Response Body

```
  4200
```

Failure:
```
  {
    message: 'Error Message'
  }
```

([back to summary](#summary))  

---
