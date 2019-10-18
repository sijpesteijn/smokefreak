#!/bin/sh
SERVICE_NAME=SmokeFreak
PATH_TO_JAR=/opt/smokefreak/target/smokefreak-0.0.1-SNAPSHOT.jar
PID_BACKEND_PATH_NAME=/tmp/smokefreak-backend-pid
PID_FRONTEND_PATH_NAME=/tmp/smokefreak-frontend-pid
case $1 in
start)
  echo "Starting $SERVICE_NAME ..."
  if [ ! -f $PID_BACKEND_PATH_NAME ]; then
       nohup java -jar $PATH_TO_JAR /tmp 2>> /dev/null >>/dev/null &
                   echo $! > $PID_BACKEND_PATH_NAME
       echo "$SERVICE_NAME backend started ..."
  else
       echo "$SERVICE_NAME backend is already running ..."
  fi
  if [ ! -f $PID_FRONTEND_PATH_NAME ]; then
       nohup serve -s /opt/smokefreak/web/build/ > output.log &
                  echo $! > $PID_FRONTEND_PATH_NAME
       echo "$SERVICE_NAME frontend started ..."
  else
       echo "$SERVICE_NAME frontend is already running ..."
  fi
;;
stop)
  if [ -f $PID_FRONTEND_PATH_NAME ]; then
         PID=$(cat $PID_FRONTEND_PATH_NAME);
         echo "$SERVICE_NAME frontend stoping ..."
         kill $PID;
         echo "$SERVICE_NAME frontend stopped ..."
         rm $PID_FRONTEND_PATH_NAME
  else
         echo "$SERVICE_NAME frontend is not running ..."
  fi
  if [ -f $PID_BACKEND_PATH_NAME ]; then
         PID=$(cat $PID_BACKEND_PATH_NAME);
         echo "$SERVICE_NAME backend stoping ..."
         kill $PID;
         echo "$SERVICE_NAME backend stopped ..."
         rm $PID_BACKEND_PATH_NAME
  else
         echo "$SERVICE_NAME backend is not running ..."
  fi
;;
restart)
  if [ -f $PID_FRONTEND_PATH_NAME ]; then
         PID=$(cat $PID_FRONTEND_PATH_NAME);
         echo "$SERVICE_NAME frontend stoping ..."
         kill $PID;
         echo "$SERVICE_NAME frontend stopped ..."
         rm $PID_FRONTEND_PATH_NAME
  else
         echo "$SERVICE_NAME frontend is not running ..."
  fi
  if [ -f $PID_BACKEND_PATH_NAME ]; then
         PID=$(cat $PID_BACKEND_PATH_NAME);
         echo "$SERVICE_NAME backend stoping ..."
         kill $PID;
         echo "$SERVICE_NAME backend stopped ..."
         rm $PID_BACKEND_PATH_NAME
  else
         echo "$SERVICE_NAME backend is not running ..."
  fi
  if [ ! -f $PID_BACKEND_PATH_NAME ]; then
       nohup java -jar $PATH_TO_JAR /tmp 2>> /dev/null >>/dev/null &
                   echo $! > $PID_BACKEND_PATH_NAME
       echo "$SERVICE_NAME backend started ..."
  else
       echo "$SERVICE_NAME backend is already running ..."
  fi
  if [ ! -f $PID_FRONTEND_PATH_NAME ]; then
       nohup serve -s /opt/smokefreak/web/build/ > output.log &
                  echo $! > $PID_FRONTEND_PATH_NAME
       echo "$SERVICE_NAME frontend started ..."
  else
       echo "$SERVICE_NAME frontend is already running ..."
  fi
;;
 esac