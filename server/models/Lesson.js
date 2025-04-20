const fs = require('fs').promises;
const path = require('path');

const LESSONS_FILE = path.join(__dirname, '../data/lessons.json');

class Lesson {
  static async findById(id) {
    const lessons = await this.readLessons();
    return lessons.find(lesson => lesson.id === id);
  }

  static async findByCategory(category) {
    const lessons = await this.readLessons();
    return lessons.filter(lesson => lesson.category === category);
  }

  static async findByLevel(level) {
    const lessons = await this.readLessons();
    return lessons.filter(lesson => lesson.level === level);
  }

  static async create(lessonData) {
    const lessons = await this.readLessons();
    
    const newLesson = {
      id: Date.now().toString(),
      title: lessonData.title,
      description: lessonData.description,
      level: lessonData.level,
      duration: lessonData.duration,
      sections: lessonData.sections.map(section => ({
        ...section,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        problems: section.problems.map(problem => ({
          ...problem,
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
        }))
      })),
      category: lessonData.category,
      prerequisites: lessonData.prerequisites || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    lessons.push(newLesson);
    await this.writeLessons(lessons);
    return newLesson;
  }

  static async update(id, lessonData) {
    const lessons = await this.readLessons();
    const index = lessons.findIndex(lesson => lesson.id === id);
    
    if (index === -1) {
      throw new Error('Lesson not found');
    }

    const updatedLesson = {
      ...lessons[index],
      ...lessonData,
      updatedAt: new Date().toISOString()
    };

    lessons[index] = updatedLesson;
    await this.writeLessons(lessons);
    return updatedLesson;
  }

  static async delete(id) {
    const lessons = await this.readLessons();
    const filteredLessons = lessons.filter(lesson => lesson.id !== id);
    
    if (filteredLessons.length === lessons.length) {
      throw new Error('Lesson not found');
    }

    await this.writeLessons(filteredLessons);
    return true;
  }

  static async readLessons() {
    try {
      const data = await fs.readFile(LESSONS_FILE, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        // File doesn't exist, create it with empty array
        await this.writeLessons([]);
        return [];
      }
      throw error;
    }
  }

  static async writeLessons(lessons) {
    await fs.writeFile(LESSONS_FILE, JSON.stringify(lessons, null, 2));
  }
}

module.exports = Lesson; 