import os
import json
import ftplib

firstDeployment = False
source = "dist"
destination = "site/wwwroot/"
config = json.load(open("appcredentials.json", "r"))

def createDirRecursively(dirpath):
	try:
		session.mkd(destination+dirpath)
	except ftplib.error_perm:
		createDirRecursively('/'.join(dirpath.split("/")[:-1]))
		session.mkd(destination+dirpath)

session = ftplib.FTP(config["endpoint"], config["username"], config["password"])
if firstDeployment:
	file = open("web.config", "rb")
	session.storbinary("STOR " + destination, file)
allFiles = [os.path.join(dp, f).replace("\\", "/") for dp, dn, filenames in os.walk(source) for f in filenames]
for f in allFiles:
	file = open(f, "rb")
	childname = str.replace(f, source+"/", "")
	try:
		session.storbinary("STOR " + destination + childname, file)
	except ftplib.error_perm:
		createDirRecursively('/'.join(childname.split("/")[:-1]))
		session.storbinary("STOR " + destination + childname, file)
	print("Uploaded at ...  ", destination+childname)
print("Done uploading ", len(allFiles), "files")
session.quit()