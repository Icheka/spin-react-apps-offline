import { accessSync, readFileSync, writeFileSync, constants } from "fs"


class npmDependencyManipulator {

  /**
    * update the dependencies of npm 
    * Primary 'package.json' or 'package_lock.json' file
    * from a custom file
    * 
    * @param {*string} primaryPath path to original npm package.json file to be updated
    * @param {*string} primaryPath path to custom package.json file to read from
    */
  constructor(primaryPath, secondaryPath) {
    this.flag = true
    this.primaryPath = primaryPath
    this.secondaryPath = secondaryPath
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
    * @param {*string} PATH path to check if exists
    */
  verifyPathExists = (PATH) => {
    this.flag = true
    try {
      accessSync(PATH, constants.F_OK);
    } catch (e) {
      this.flag = false;
    }
    return this.flag;
  }

  /**
    * 
    * validate if Original and Custom Path  exists
    */
  validatePath = () => {
    this.flag = true;
    //verify primary file path
    if (!this.verifyPathExists(this.primaryPath)) {
      console.error(`Primary Package Path: "${this.primaryPath}" is invalid`)
      this.flag = false;
    }
    //verify secondary file path
    if (!this.verifyPathExists(this.secondaryPath)) {
      console.error(`Secondary Package Path: "${this.secondaryPath}" is invalid`)
      this.flag = false;
    }
    return this.flag
  }

  /**
    * 
    * Append the dependencies of the Primary File
    * with the dependencies from the Custom File
    */
  updateDependencies = () => {
    this.flag = true
    if (this.validatePath()) {
      try {
        //unpack files content in javascript object and save to const
        const [primaryPackage, secondaryPackage] = [JSON.parse(this.openFile(this.primaryPath)), JSON.parse(this.openFile(this.secondaryPath))]
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
        writeFileSync(this.primaryPath, JSON.stringify(updatedPackage, null, 2))
        return this.flag
      } catch (error) {
        console.error(error)
        return this.flag
      }

    }
  }
}
export default npmDependencyManipulator