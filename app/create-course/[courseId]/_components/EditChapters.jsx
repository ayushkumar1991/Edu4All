import React, { useState } from 'react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { FaEdit } from "react-icons/fa";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

function EditChapters({ course, index }) {
    // Ensure Chapters has a default value
    const Chapters = course?.courseOutput?.chapters || [];

    // Check if course and index are valid
    if (!course || index === undefined || index < 0 || index >= Chapters.length) {
        return null; // or return a fallback UI
    }

    // Safely access the chapter
    const chapter = Chapters[index] || {};

    const [name, setName] = useState(chapter.ChapterName || '');
    const [about, setAbout] = useState(chapter.About || '');

    const onUpdateHandler = () => {
        // Add your update logic here
        console.log("Updated Chapter:", { name, about });
    };

    return (
        <Dialog>
            <DialogTrigger>
                <FaEdit />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Chapters!</DialogTitle>
                    <DialogDescription>
                        <div className='mt-3'>
                            <label>Course Title</label>
                            <Input
                                defaultValue={chapter.ChapterName || ''}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>
                        <div>
                            <label>Description</label>
                            <Textarea
                                className="h-52"
                                defaultValue={chapter.About || ''}
                                onChange={(event) => setAbout(event.target.value)}
                            />
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose>
                        <Button onClick={onUpdateHandler}>Update</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default EditChapters;