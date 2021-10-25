#!/bin/bash
INSTANCE_ID=$(curl -s http://169.254.169.254/latest/meta-data/instance-id)
USEDMEMORY=$(free -m | awk 'NR==2{printf "%.2f\t", $3*100/$2 }')
TCP_CONN_PORT_3001=$(netstat -an | grep 3001 | wc -l)
aws cloudwatch put-metric-data --metric-name memory-usage --dimensions Instance=$INSTANCE_ID --namespace "Custom" --value $USEDMEMORY
aws cloudwatch put-metric-data --metric-name TCP_connection_on_port_3001 --dimensions Instance=$INSTANCE_ID --namespace "Custom" --value $TCP_CONN_PORT_3001