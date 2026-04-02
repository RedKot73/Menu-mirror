curl -X POST http://localhost:5001/graphql ^
  -H "Content-Type: application/json" ^
  -d "{\"query\": \"mutation Login($user: String!, $pass: String!) { login(userName: $user, password: $pass) { token requiresTwoFactor userId user { userName roles } } }\", \"variables\": {\"user\": \"havrok\", \"pass\": \"A4742A4742!\"}}"
