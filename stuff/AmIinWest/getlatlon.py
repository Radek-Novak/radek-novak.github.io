#! /usr/local/bin/python3

import json
import sys
import xml.etree.ElementTree as ET

if __name__ == "__main__":
  if len(sys.argv) < 2:
    print('need a filename as an argument')
    sys.exit(1)

  tree = ET.parse(sys.argv[1])
  root = tree.getroot()
  nodes = map(lambda node: (float(node.attrib['lat']), float(node.attrib['lon'])), root.iter('node'))
  print(json.dumps(list(nodes)))