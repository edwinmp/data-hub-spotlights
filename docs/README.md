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

### 1.1 Dependencies

The Spotlights are dependent of 2 other repositories, and the data warehouse

1. [The DI Website (Wagtail CMS)](https://github.com/devinit/DIwebsite-redesign)
2. [The DDW API](https://github.com/devinit/ddw-external-api)

### 1.2 The Wagtail CMS

The CMS contains the configurations that determine what is shown on the spotlights i.e. which topics or indicators to show on the map section, or which tabs & content therein to show on the Key Facts section e.t.c

These configs exist as a set of snippets and pages in the Wagtail CMS.

### Snippets

#### Spotlight Colour

Holds the colours that are used on the maps and their legends, determining the monochromatic shades to use for each indicator

| Field | Description                             |
| ----- | --------------------------------------- |
| name  | The name of the colour e.g red, indigo  |
| code  | A valid colour code, usually hex or RGB |

Below are the config pages in order of heirarchy

### Pages
