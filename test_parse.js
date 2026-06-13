const fs = require('fs');
const data = JSON.parse(fs.readFileSync('/home/danik/Desktop/projecty/frontend/public/courses/react-flask-fullstack.json', 'utf8'));
function sortByOrder(items = []) {
  return [...items].sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0));
}
function normalizeCourse(course) {
  if (!course) return null;
  return {
    ...course,
    modules: sortByOrder(course.modules).map((module) => ({
      ...module,
      lessons: sortByOrder(module.lessons),
    })),
  };
}
const norm = normalizeCourse(data);
console.log("Modules:", norm.modules.length);
console.log("Lessons in mod 0:", norm.modules[0].lessons.length);
console.log("First lesson:", norm.modules[0].lessons[0].title);
