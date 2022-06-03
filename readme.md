# Introduction

A user Module for a organization

## Modals

#### User Modal

```javascript
{
  "username" : string,
  "email"    : sting,
  "password" : string,
  "roles"    : array,
}
```

## Responses

All the API endpoints return a JSON representation of the resources created or edited. However, if an invalid request is submitted, or some other error occurs, some a error statuscodes will be received

## Api End Points

### Register

```http
POST /api/register
```

#### body

```javascript
{
  "username" : string,
  "email"    : sting,
  "password" : string,
  "roles"    : array,
}
```

### Login

```http
POST /api/login
```

body

```javascript
{
  "username" : string,
  "password" : string,
}
```

### Edit User Details

```http
PUT /api/:id
```

#### body

```javascript
{
  "username" : string(optional),
  "email"    : sting(optional),
  "password" : string(optional),
  "roles"    : array(optional),
}
```

#### headers

token "Bearer TOKEN"

### Add Roles to User

```http
POST /api/addrole/:role/:id
```

Only Admin can be able to assign new roles to new users

#### headers

token "Bearer TOKEN"

### Remove Roles to User

```http
POST /api/removerole/:role/:id
```

Only Admin can be able to remove roles from a user

#### headers

token "Bearer TOKEN"

### Refresh Token

```http
POST /api/ref-token
```

Each time the token will expire after 2 minntus, to refresh the token a refress token is needed which will e created during login.

#### headers

reftoken "Bearer REFTOKEN"

## Roles

| value | Description |
| :--- | :--- |
| 0 | `admin` |
| 1 | `hr` |
| 2 | `project manager` |
| 3 | `team leader` |
| 4 | `team member` |

## Status Codes

Gophish returns the following status codes in its API:

| Status Code | Description |
| :--- | :--- |
| 200 | `OK` |
| 201 | `CREATED` |
| 400 | `BAD REQUEST` |
| 404 | `NOT FOUND` |
| 500 | `INTERNAL SERVER ERROR` |
