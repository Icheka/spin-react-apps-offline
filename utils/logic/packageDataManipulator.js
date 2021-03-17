const {
  accessSync,
  readFileSync,
  writeFileSync,
  constants,
} = require("fs-extra");

class PackageDataManipulator {
  constructor() {
    this.flag = true;
  }

  /**
   *
   * @param {*string} PATH path to json file to open
   */
  openFile = (PATH) => {
    try {
      return readFileSync(PATH, { encoding: "utf8" }).toString();
    } catch (error) {
      console.error(`Cannot Open File: ${error.message}`);
    }
  };

  /**
   *
   * @param {*string} PATH Verify if file path given exists
   */
  verifyPathExists = (PATH) => {
    this.flag = true;
    try {
      accessSync(PATH, constants.F_OK);
    } catch (e) {
      console.error(`File Path: "${PATH}" is invalid`);
      this.flag = false;
    }
    return this.flag;
  };

  /**
   *
   * update the dependencies of npm Primary 'package.json'
   * or 'package_lock.json' file from a custom file
   *
   * @param {*string} primaryPath path to original npm package.json file to be updated
   * @param {*string} secondaryPath path to custom package.json file to read from
   */
  updateDependencies = (primaryPath, secondaryPath) => {
    return new Promise((resolve, reject) => {
      this.flag = true;
      if (
        this.verifyPathExists(primaryPath) &&
        this.verifyPathExists(secondaryPath)
      ) {
        try {
          //unpack files content in javascript object and save to const
          const [primaryPackage, secondaryPackage] = [
            JSON.parse(this.openFile(primaryPath)),
            JSON.parse(this.openFile(secondaryPath)),
          ];
          //unpack package dependencies to const
          const [primaryPackageDependencies, secondaryPackageDependencies] = [
            primaryPackage["dependencies"],
            secondaryPackage["dependencies"],
          ];
          const mergedDependencies = {
            ...primaryPackageDependencies,
            ...secondaryPackageDependencies,
          };
          const sortedMergedDependencies = Object.keys(mergedDependencies)
            .sort()
            .reduce((obj, key) => {
              obj[key] = mergedDependencies[key];
              return obj;
            }, {});
          const updatedPackage = {
            ...primaryPackage,
            dependencies: { ...sortedMergedDependencies },
          };
          writeFileSync(primaryPath, JSON.stringify(updatedPackage, null, 2));
          resolve(this.flag);
        } catch (error) {
          console.error(error);
          reject(this.flag);
        }
      } else {
        reject(this.flag);
      }
    });
  };

  updateLockPackages = (primaryPath, secondaryPath) => {
    return new Promise((resolve, reject) => {
      this.flag = true;
      if (
        this.verifyPathExists(primaryPath) &&
        this.verifyPathExists(secondaryPath)
      ) {
        try {
          //unpack files content in javascript object and save to const
          const [primaryLock, secondaryLock] = [
            JSON.parse(this.openFile(primaryPath)),
            JSON.parse(this.openFile(secondaryPath)),
          ];
          //unpack lock package dependencies to const
          const [primaryLockPackages, secondaryLockPackages] = [
            primaryLock["packages"],
            secondaryLock["packages"],
          ];

          const mergedPackages = {
            ...secondaryLockPackages,
            ...primaryLockPackages,
          };

          const sortedMergedPackages = Object.keys(mergedPackages)
            .sort()
            .reduce((obj, key) => {
              obj[key] = mergedPackages[key];
              return obj;
            }, {});

          const updatedLockPackages = {
            ...primaryLock,
            packages: { ...sortedMergedPackages },
          };

          const [
            primaryLockPackageDependencies,
            secondaryLockPackageDependencies,
          ] = [
            updatedLockPackages["packages"][""]["dependencies"],
            secondaryLockPackages[""]["dependencies"],
          ];
          const mergedLockPackageDependencies = {
            ...primaryLockPackageDependencies,
            ...secondaryLockPackageDependencies,
          };
          const sortedMergedLockPackageDependencies = Object.keys(
            mergedLockPackageDependencies
          )
            .sort()
            .reduce((obj, key) => {
              obj[key] = mergedLockPackageDependencies[key];
              return obj;
            }, {});
          let updatedLock = { ...updatedLockPackages };
          updatedLock["packages"][""]["dependencies"] = {
            ...sortedMergedLockPackageDependencies,
          };
          writeFileSync(primaryPath, JSON.stringify(updatedLock, null, 2));
          resolve(this.flag);
        } catch (error) {
          console.error(error);
          reject(this.flag);
        }
      } else {
        reject(this.flag);
      }
    });
  };

  /**
   *
   * Update the project Attributes of npm 'package.json' or 'package_lock.json' file
   *
   * @param {*string} packageJsonPath path to npm package.json file
   * @param {*string} packageLockPath path to npm package-lock.json file
   * @param {*Object} projectData data about the new project
   */
  updateProjectDetail = (projectFolder, projectData) => {
    return new Promise((resolve, reject) => {
      this.flag = true;
      let packageJsonPath = `${projectFolder}/package.json`;
      let packageLockPath = `${projectFolder}/package-lock.json`;
      let nodePackageLockPath = `${projectFolder}/node_modules/.package-lock.json`;
      if (
        this.verifyPathExists(packageJsonPath) &&
        this.verifyPathExists(packageLockPath)
      ) {
        try {
          //unpack files content in javascript object and save to const
          const [packageJson, packageLock, nodePackageLock] = [
            JSON.parse(this.openFile(packageJsonPath)),
            JSON.parse(this.openFile(packageLockPath)),
            JSON.parse(this.openFile(nodePackageLockPath)),
          ];
          //overide the existing data with new supplied values
          const updatedProjectData = { ...packageJson, ...projectData };
          const updatedProjectLockData = { ...packageLock, ...projectData };
          const updatedNodeProjectLockData = {
            ...nodePackageLock,
            ...projectData,
          };
          writeFileSync(
            packageJsonPath,
            JSON.stringify(updatedProjectData, null, 2)
          );
          writeFileSync(
            packageLockPath,
            JSON.stringify(updatedProjectLockData, null, 2)
          );

          writeFileSync(
            nodePackageLockPath,
            JSON.stringify(updatedNodeProjectLockData, null, 2)
          );
          return resolve(this.flag);
        } catch (error) {
          console.error(error);
          return reject(this.flag);
        }
      }
    });
  };
}
module.exports = new PackageDataManipulator();
