# ── STAGE 1: build con Maven ─────────────────────────
FROM maven:3.9.6-eclipse-temurin-17-alpine AS builder
WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline -q

COPY src ./src
RUN mvn clean package -DskipTests -q

# ── STAGE 2: runtime mínimo ──────────────────────────
FROM eclipse-temurin:17-jre-alpine AS production

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
RUN chown appuser:appgroup app.jar
USER appuser

EXPOSE 8080

ENV DB_ENDPOINT=localhost     DB_PORT=3306     DB_NAME=ventas_db     DB_USERNAME=root     DB_PASSWORD=password

ENTRYPOINT ["java", "-jar", "app.jar"]