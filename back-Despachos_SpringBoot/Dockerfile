# ── STAGE 1: build con Maven ─────────────────────────
FROM maven:3.9.6-eclipse-temurin-17-alpine AS builder
WORKDIR /app

# Copiar pom.xml primero (cache de dependencias Maven)
COPY pom.xml .
RUN mvn dependency:go-offline -q

# Copiar fuentes y compilar (skip tests)
COPY src ./src
RUN mvn clean package -DskipTests -q

# ── STAGE 2: runtime mínimo ──────────────────────────
FROM eclipse-temurin:17-jre-alpine AS production

# Crear usuario no-root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app
# Copiar solo el JAR compilado
COPY --from=builder /app/target/*.jar app.jar

# Cambiar propietario y usuario
RUN chown appuser:appgroup app.jar
USER appuser

EXPOSE 8081

# Variables de entorno con valores por defecto
ENV DB_ENDPOINT=localhost     DB_PORT=3306     DB_NAME=despachos_db     DB_USERNAME=root     DB_PASSWORD=password

ENTRYPOINT ["java", "-jar", "app.jar"]