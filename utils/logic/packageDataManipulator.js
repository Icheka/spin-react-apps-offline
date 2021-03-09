import { accessSync, readFileSync, writeFileSync, constants } from "fs"


class packageDataManipulator {


  constructor() {
    this.flag = true
  }

  /**
    * 
    * @param {*string} PATH path to json file to open
    */
  openFile = (PATH) => {
    try {
      return readFileSync(PATH, { encoding: 'utf8' }).toString()
    } catch (error) {
      console.error(`Cannot Open File: ${error.message}`);
    }
  }


  /**
    * 
    * @param {*string} PATH Verify if file path given exists
    */
  verifyPathExists = (PATH) => {
    this.flag = true
    try {
      accessSync(PATH, constants.F_OK);
    } catch (e) {
      console.error(`File Path: "${primaryPath}" is invalid`)
      this.flag = false;
    }
    return this.flag;
  }

  /**
    * 
    * update the dependencies of npm Primary 'package.json' 
    * or 'package_lock.json' file from a custom file
    * 
    * @param {*string} primaryPath path to original npm package.json file to be updated
    * @param {*string} secondaryPath path to custom package.json file to read from
    */
  updateDependencies = (primaryPath, secondaryPath) => {
    this.flag = true
    if (this.verifyPathExists(primaryPath) && this.verifyPathExists(secondaryPath)) {
      try {
        //unpack files content in javascript object and save to const
        const [primaryPackage, secondaryPackage] = [JSON.parse(this.openFile(primaryPath)), JSON.parse(this.openFile(secondaryPath))]
        //unpack package dependencies to const
        const [primaryPackageDependencies, secondaryPackageDependencies] = [primaryPackage["dependencies"], secondaryPackage["dependencies"]]
        const mergedDependencies = { ...primaryPackageDependencies, ...secondaryPackageDependencies };
        const sortedMergedDependencies = Object.keys(mergedDependencies).sort().reduce(
          (obj, key) => {
            obj[key] = mergedDependencies[key];
            return obj;
          },
          {}
        );
        const updatedPackage = { ...primaryPackage, "dependencies": { ...sortedMergedDependencies } }
        writeFileSync(primaryPath, JSON.stringify(updatedPackage, null, 2))
        return this.flag
      } catch (error) {
        console.error(error)
        return this.flag
      }

    }
  }

  /**
    * 
    * Update the project Attributes of npm 'package.json' or 'package_lock.json' file
    * 
    * @param {*string} packageJsonPath path to npm package.json file
    * @param {*string} packageLockPath path to npm package-lock.json file
    */
  updateProjectDetail = (packageJsonPath, packageLockPath, projectData) => {
    this.flag = true
    if (this.verifyPathExists(packageJsonPath) && this.verifyPathExists(packageLockPath)) {
      try {
        //unpack files content in javascript object and save to const
        const [packageJson, packageLock] = [JSON.parse(this.openFile(packageJsonPath)), JSON.parse(this.openFile(packageLockPath))]
        //overide the existing data with new supplied values
        const updatedProjectData = { ...packageJson, ...projectData };

        writeFileSync(updatedProjectData, JSON.stringify(updatedProjectData, null, 2))
        return this.flag
      } catch (error) {
        console.error(error)
        return this.flag
      }

    }
  }
}
export default packageDataManipulator