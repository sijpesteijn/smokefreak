#!/bin/sh
SERVICE_NAME=SmokeFreak
PATH_TO_JAR=/opt/smokefreak/target/smokefreak-0.0.1-SNAPSHOT.jar
PID_PATH_NAME=/tmp/smokefreak-pid
case $1 in
start)
       echo "Starting $SERVICE_NAME ..."
  if [ ! -f $PID_PATH_NAME ]; then
       nohup /usr/bin/yarn --cwd /opt/smokefreak/web start
       nohup java -jar $PATH_TO_JAR /tmp 2>> /dev/null >>/dev/null &
                   echo $! > $PID_PATH_NAME
       echo "$SERVICE_NAME started ..."
  else
       echo "$SERVICE_NAME is already running ..."
  fi
;;
stop)
  if [ -f $PID_PATH_NAME ]; then
         PID=$(cat $PID_PATH_NAME);
         echo "$SERVICE_NAME stoping ..."
         kill $PID;
         echo "$SERVICE_NAME stopped ..."
         rm $PID_PATH_NAME
  else
         echo "$SERVICE_NAME is not running ..."
  fi
;;
restart)
  if [ -f $PID_PATH_NAME ]; then
      PID=$(cat $PID_PATH_NAME);
      echo "$SERVICE_NAME stopping ...";
      kill $PID;
      echo "$SERVICE_NAME stopped ...";
      rm $PID_PATH_NAME
      echo "$SERVICE_NAME starting ..."
      nohup java -jar $PATH_TO_JAR /tmp 2>> /dev/null >> /dev/null &
      echo $! > $PID_PATH_NAME
      echo "$SERVICE_NAME started ..."
  else
      echo "$SERVICE_NAME is not running ..."
     fi     ;;
 esac