# Spotlights Version 2.0 Documentation

This documentation details all that one needs to know to properly configure and populate the [DI spotlights](https://devinit.org/data/spotlights-on-kenya-and-uganda/)

## Table of Contents

1. [Introduction](#1-introduction)

   1.1 [Dependencies](#11-dependencies)

   1.2 [The Wagtail CMS](#12-the-wagtail-cms)

   1.3 [The DDW API](#12-the-ddw-api)

   1.4 [The Data Warehouse](#14-the-data-warehouse)

2. [The Map Section](#the-map-section)

## 1. Introduction

## 1.1 Dependencies

The Spotlights are dependent of 2 other repositories, and the data warehouse

1. [The DI Website (Wagtail CMS)](https://github.com/devinit/DIwebsite-redesign)
2. [The DDW API](https://github.com/devinit/ddw-external-api)

## 1.2 The Wagtail CMS

The CMS contains the configurations that determine what is shown on the spotlights i.e. which topics or indicators to show on the map section, or which tabs & content therein to show on the Key Facts section e.t.c

These configs exist as a set of snippets and pages in the Wagtail CMS.

### Snippets

### Spotlight Colour

Holds the colours that are used on the maps and their legends, determining the monochromatic shades to use for each indicator

| Field | Description                             |
| ----- | --------------------------------------- |
| name  | The name of the colour e.g red, indigo  |
| code  | A valid colour code, usually hex or RGB |

Below are the config pages in order of heirarchy

### Pages

### Spotlight Page

Each Spotlight page represents a unique country spotlight e.g Spotlight on Uganda or Spotlight on Kenya

**Hierarchy**

`Home Page` -> `Data Section Page` -> `Spotlight Page`

**Core Fields**
| Field | Description |
| ----- | --------------------------------------- |
| title | The title of the page |
| slug | The sub-path that'll appear in the URL |
| Country Code | This must match the code in the DDW and is used to fetch country-level data e.g for populating the country-level `Key Facts` & `Revenue/Expenditure` sections |
| Country Name | This will appear in various sections throughout the spotlights |
| Currency Code | The code used to identify the country's currency e.g USD, GBP, UGX |

**Data Sources Section**

The content here is used to populate the `Data Sources` section at the bottom of the page.
Links to data sources and meta data are added here, as well as a description of what this section is about

### Spotlight Theme Page

`Home Page` -> `Data Section Page` -> `Spotlight Page` -> `Spotlight Theme Page`

Theme pages group indicators in the various sections under specific themes e.g Poverty, Population, Health

**Core Fields**
| Field | Description |
| ----- | --------------------------------------- |
| title | The title of the page |
| section | Determines which section on the spotlights a particular theme and its indicators appears e.g map,facts,country-facts|
| slug | Unique to each page. As an extra distinction, country fact slugs are prefixed with 'country-' e.g. 'country-health'|

### Spotlight Indicator Page

`Home Page` -> `Data Section Page` -> `Spotlight Page` -> `Spotlight Theme Page` -> `Spotlight Indicator Page`

This is the most important page holding all the information and configuration on each indicator

**Core Fields**
| Field | Description |
| ----- | --------------------------------------- |
| title | The title of the indicator |
| DDW ID | The database table name from which the data on this indicator will be fetched via API |
| description | A brief description of the indicator. For map indicators, this appears on the spotlight |
| Source | The source of the indicator data |
| Colour | Corresponds to a Spotlight Colour - used when rendering maps |
| Start Year | Indicator data is of time dimension & thus grouped by year - this specifies the earliest year of the data fetched |
| End Year | This specifies the latest year of the data fetched |
| Excluded Years | Comma separated list of years to exclude from the year dropdown |
| Data Format | Can be one of plain, currency or percent |
| Range | For map indicators, this is used to group values based on a specified range. Each range is assigned a colour that appears in the legend |
| Value Prefix | Prefix values on maps, charts and dashboards |
| Value Suffix | Suffix to values on maps, charts and dashboards |
| JSON Config | Advanced config that for some sections has higher precedent than the previous configs e.g Key facts & Revenue/Expenditure |

**JSON Config For Key Facts**

    [
      {
        "chart": { // used for rendering charts
          "indicators": [
            "uganda_population_rural_urban" // add one or more indicators
          ],
          "title": "What is the urban versus rural split?", // title of the key facts section
          "startYear": 2014, // lower limit year
          "endYear": 2016 // upper limit year
          "meta": { // holds meta information about the indicator
            "description": "Percentage of population living in urban and rural settings, by district.",
            "source": "National Population and Housing Census 2014, Uganda Bureau of Statistics."
          },
          "options": {}, // holds raw chart options as specified in the eCharts documentation (https://echarts.apache.org/en/option.html#title)
          "bar": { // configs of the specific chart type ... can also be "line"
            "xAxis": "year", // data point to use for x-axis data
            "yAxis": [ // data points to use for y-axis data - also corresponds to series
              "value_rural",
              "value_urban"
            ]
          },
          "aggregation": "PERCENT" // specifies the type of aggregation to perform on the data. Has 'SUM','AVG','PERCENT','POSN ASC','POSN DESC'
        }
      }
    ]


    [
      {
        "stat": { // used for rendering statistics
          "indicators": [
            "uganda_population_rural_urban" // add one or more indicators
          ],
          "startYear": 2014, // lower limit year
          "endYear": 2016 // upper limit year
          "dataFormat": "currency", // also supports plain & percent
          "valuePrefix": "USD", // prepend to data value
          "valueSuffix": "", // append to data value
          "meta": { // holds meta information about the indicator
            "description": "Percentage of population living in urban and rural settings, by district.",
            "source": "National Population and Housing Census 2014, Uganda Bureau of Statistics."
          },
          "note": { // renders extra text that comes after the statistic value
            "content": "domestic public", // actual text to show
            "meta": { // used in case the note requires extra info
                "description": "Non-grant government revenue. Data is for 2016.",
                "source": "Development Initiatives based on IMF Staff reports."
            }
          },
          "filter": [ // applied to the graphql API to filter the data further
            [
              { // have more of these in the same array corresponds to an OR operation
                "field": "l1", // field to filter
                "operator": "=", // operator to use for filtering e.g IS, IS NOT, >, < e.t.c
                "value": "total-revenue-and-grants" // as it says, the value
              }
            ],
            [ // having multiple arrays of filters corresponds to an AND operation
              {
                "field": "l2",
                "operator": "=",
                "value": "revenue"
              }
            ],
            [
              {
                "field": "l3",
                "operator": "IS",
                "value": "NULL"
              }
            ],
            [
              {
                "field": "l4",
                "operator": "IS",
                "value": "NULL"
              }
            ]
          ]
        }
      }
    ]

**JSON Config for Revenue/Expenditure/Finance**

      {
        "revenue": { // can also be "expenditure"
          "root": "financing" // determines which context to priorities e.g financing, Revenue or Expenditure
        }
      }

### Spotlight Location Comparison Page

`Home Page` -> `Data Section Page` -> `Spotlight Page` -> `Spotlight Theme Page` -> `Spotlight Location Comparison Page`

This is used for basic configs for the location comparison page of a spotlight

**Core Fields**
| Field | Description |
| ----- | --------------------------------------- |
| title | The title of the page |
| Default Locations | If no locations are selected on the comparison page, the ones added here are the defaults |
