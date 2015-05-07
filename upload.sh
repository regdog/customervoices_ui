#!/bin/bash

if [ $# -ne 3 ]
  then echo "Please provide path to manifest file, cf user and cf password"
else
  cf login -u $2 -p $3 -a https://api.cf1.hybris.com --skip-ssl-validation
  cf push -f $1
fi