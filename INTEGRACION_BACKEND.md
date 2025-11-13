# 🔐 Guía de Integración con Backend (Microservicios con Encriptación)

## ✅ Lo que ya está listo

Tu frontend **YA está preparado** para trabajar con tu backend de microservicios que usa encriptación. Solo necesitas hacer un pequeño cambio cuando tu backend esté listo.

## 📋 Cómo funciona la autenticación segura

### 1. **Frontend (lo que tienes ahora)**
```
Usuario ingresa: email + contraseña
   ↓
Frontend valida formato
   ↓
Envía por HTTPS → { email, password } → Backend
```

### 2. **Backend (tu microservicio con encriptación)**
```
Recibe: { email, password }
   ↓
Busca usuario en BD por email
   ↓
Compara password con hash almacenado (bcrypt/argon2)
   ↓
Si coincide → Genera JWT token
   ↓
Retorna: { token, user }
```

### 3. **Frontend guarda el token**
```
localStorage.setItem("token", token)
   ↓
Usa el token en todas las peticiones autenticadas:
Authorization: Bearer {token}
```

## 🔄 Cómo conectar con tu backend REAL

### Paso 1: Crear archivo de configuración `.env`

Crea un archivo `.env` en la raíz de `/frontend`:

```bash
REACT_APP_API_URL=http://localhost:8080/api
```

### Paso 2: Cambiar el import en `inicioSesionForm.jsx`

**ANTES (usando mock):**
```javascript
import { loginMock } from "../../services/auth";

// En handleSubmit:
await loginMock({ email: email.trim(), password });
```

**DESPUÉS (usando backend real):**
```javascript
import { login } from "../../services/auth";

// En handleSubmit:
await login({ email: email.trim(), password });
```

¡Y eso es todo! 🎉

## 🔒 Seguridad: Lo que tu backend DEBE hacer

### ✅ Backend correcto (seguro):

```java
// Ejemplo en Java Spring Boot
@PostMapping("/auth/login")
public ResponseEntity<?> login(@RequestBody LoginRequest request) {
    // 1. Buscar usuario por email
    User user = userRepository.findByEmail(request.getEmail());
    
    // 2. Comparar contraseña con BCrypt
    if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
        throw new BadCredentialsException("Credenciales incorrectas");
    }
    
    // 3. Generar JWT token
    String token = jwtService.generateToken(user);
    
    // 4. Retornar token y datos del usuario
    return ResponseEntity.ok(new LoginResponse(token, user));
}
```

### ❌ Lo que NO debes hacer:

- ❌ Encriptar la contraseña en el frontend
- ❌ Enviar contraseñas sin HTTPS
- ❌ Guardar contraseñas en texto plano en la BD
- ❌ Comparar contraseñas con `===` en lugar de `bcrypt.compare()`

## 📡 Formato esperado de respuesta del backend

### Respuesta exitosa (HTTP 200)
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "usuario@ejemplo.com",
    "nombre": "María García"
  }
}
```

### Respuesta de error (HTTP 401)
```json
{
  "message": "Credenciales incorrectas"
}
```

## 🛡️ Cómo usar el token en otras peticiones

Una vez que el usuario inició sesión, todas las peticiones autenticadas deben incluir el token:

```javascript
import { getToken } from '../services/auth';

// Ejemplo de petición autenticada
const response = await fetch(`${API_URL}/casos/mis-casos`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`
  }
});
```

## 🔧 Validación del token en el backend

Tu microservicio debe validar el token JWT en cada petición protegida:

```java
// Ejemplo de middleware/interceptor
public boolean validateToken(String token) {
    try {
        Jws<Claims> claims = Jwts.parser()
            .setSigningKey(SECRET_KEY)
            .parseClaimsJws(token);
        return !claims.getBody().getExpiration().before(new Date());
    } catch (JwtException e) {
        return false;
    }
}
```

## 📋 Checklist de integración

Cuando conectes con tu backend real:

- [ ] Backend retorna `{ token, user }` en login exitoso
- [ ] Backend usa HTTPS en producción
- [ ] Backend encripta contraseñas con bcrypt/argon2
- [ ] Backend valida JWT en endpoints protegidos
- [ ] Frontend cambia de `loginMock` a `login`
- [ ] Frontend incluye token en headers: `Authorization: Bearer {token}`
- [ ] Crear archivo `.env` con `REACT_APP_API_URL`
- [ ] Probar login con credenciales reales
- [ ] Probar manejo de errores (401, 500, etc.)

## ⚠️ Notas importantes

1. **El frontend NUNCA encripta contraseñas** - Solo las envía por HTTPS al backend
2. **Tu backend YA maneja la encriptación** - El frontend solo envía texto plano (pero por HTTPS)
3. **HTTPS es obligatorio en producción** - Sin él, las contraseñas viajan sin protección
4. **El token expira** - Tu backend debe configurar un tiempo de expiración (ej: 24 horas)

## 🚀 Resumen

**Lo único que necesitas cambiar:**
```javascript
// De esto:
import { loginMock } from "../../services/auth";
await loginMock({ email, password });

// A esto:
import { login } from "../../services/auth";
await login({ email, password });
```

**Todo lo demás ya está listo!** 🎉
