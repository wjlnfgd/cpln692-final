library(tidyverse)
library(sf)
library(geojsonio)
library(spdplyr)
library(rmapshaper)

rawData<-read.csv("C:/Users/wjlnf/Desktop/test/final/data/Final_CoffeeDatasetforR.csv")

##########  Select the Brands   #########
chainStore<-
  rawData %>%
  group_by(CONAME)%>%
  summarize(n = n()) %>%
  filter(n>10) %>%
  mutate(NAME = CONAME)
  

######## Clean the Dataset   ########
cleanData<-
  rawData %>%
  filter(CONAME==chainStore$NAME[1])

for (i in 2:5){
  cleanData=cleanData%>%rbind(rawData %>%
                                filter(CONAME == chainStore$NAME[i]))
}

cleanData <-
  cleanData %>%
  mutate(NAME = CONAME,ID = c(1:751)) %>%
  select(-ISCODE)



######### for Geojson  ########
shp<-st_as_sf(cleanData,coords = c("longitude","latitude"),crs=4326)
coffeeJson<-geojson_json(shp)

geojson_write(coffeeJson,file = "C:/Users/wjlnf/Desktop/test/final/data/coffeePA.geojson")




