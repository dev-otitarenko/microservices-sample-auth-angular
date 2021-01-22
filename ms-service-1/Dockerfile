FROM openjdk:8u181-jdk-alpine

VOLUME ["/tmp", "/tmp/logs"]

ADD /target/*.jar app.jar

EXPOSE 8811

CMD java -jar $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -Dspring.profiles.active=docker /app.jar