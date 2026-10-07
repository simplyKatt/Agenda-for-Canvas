>[!NOTE]
>This file has had links and media from non-trusted sources removed automatically. To view the original content, please see the source material [here](https://github.com/UseBetterCanvas/canvas-task-extension/blob/main/README.md).

# Tasks Browser Extension for Canvas Instructure

Ever had trouble finding your weekly assignments? Wish you had a nice progress bar to motivate you to complete everything?

No? Well either way, the **Tasks Browser Extension for Canvas** is here to help!

## Download
Edge, Opera, and Vivaldi are compatible with the Chrome version.
## Features

### Stay on Track

Colorful task items ensure that you'll never miss an assignment again.


### Track Your Progress

Visual progress bars for each of your courses show how far you are in completing your assignments this week.


### Make It Your Own

Task items and progress bars correspond with your chosen dashboard colors and positions.


### Notes

- The sidebar only works in Card View and Recent Activity.
- Only courses that have assignments will appear in the chart.
  - Alternatively, you can choose to show all dashboard courses in the options page.
    - To change your dashboard courses, go to **Courses** in the left sidebar, go to **All Courses** and star the classes that you want on your dashboard.
- The **Unfinished** assignments list will show all assignments from the dashboard courses that are both unsubmitted and ungraded or have a grade of 0.

## Installing and Running for Development

### Procedures:

1. Check if your [Node.js](https://nodejs.org/) version is >= **10.13**.
2. Clone this repository.
3. Run `npm install` to install the dependencies.
4. Run `npm start`
5. If on Chrome: Load the extension following:
   1. Access `chrome://extensions/`
   2. Check `Developer mode`
   3. Click on `Load unpacked extension`
   4. Select the `build` folder.
5. If on Firefox: Load the extension following:
   1. Copy `canvas-task-extension-main/src/manifest-firefox.json` to `canvas-task-extension-main/build/manifest.json`
   2. Access `about:debugging`
   3. Click on `This Firefox`
   4. Click `Load Temporary Add-on`
   5. Select the `build` folder and click on `manifest.json`
7. Happy hacking.

Built with [Chrome Extension Boilerplate with React 17 and Webpack 5](https://github.com/lxieyang/chrome-extension-boilerplate-react.git)
