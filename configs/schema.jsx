import { boolean, integer, json, pgTable, serial, varchar } from "drizzle-orm/pg-core";

// Define the CourseList table
export const CourseList = pgTable('courseList', {
    id: serial('id').primaryKey(),
    courseId: varchar('courseId').notNull(),
    name: varchar('name').notNull(),
    category: varchar('category').notNull(),
    level: varchar('level').notNull(),
    includeVideo: varchar('includeVideo').notNull().default('Yes'),
    courseOutput: json('courseOutput').notNull(),
    createdBy: varchar('createdBy').notNull(),
    userName: varchar('username'),
    userProfileImage: varchar('userProfileImage'),
    courseBanner: varchar('courseBanner').default('/Book1.jpg'),
    publish: boolean('publish').default(false),
    completed: boolean('completed').default(false) // Add this line
});

// Define the Chapters table
export const Chapters = pgTable('chapters', {
    id: serial('id').primaryKey(),
    courseId: varchar('courseId').notNull(),
    chapterId: integer('chapterId').notNull(),
    content: json('content').notNull(),
    videoId: varchar('videoId').notNull()
});