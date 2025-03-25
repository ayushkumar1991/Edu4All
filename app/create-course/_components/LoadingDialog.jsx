import React from 'react';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import Image from 'next/image';
import { motion } from 'framer-motion';

function LoadingDialog({ loading }) {
    return (
        <AlertDialog open={loading}>
            <AlertDialogContent className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
                <AlertDialogHeader>
                    <AlertDialogDescription>
                        <motion.div
                            className="flex flex-col items-center py-10"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                            {/* Static GIF with subtle scaling animation */}
                            <motion.div
                                className="relative w-24 h-24 mb-6"
                                animate={{
                                    scale: [1, 1.1, 1],
                                }}
                                transition={{
                                    duration: 2,
                                    ease: "easeInOut",
                                    repeat: Infinity,
                                }}
                            >
                                <Image
                                    src={'/loader.gif'}
                                    alt="Loading"
                                    width={100}
                                    height={100}
                                    className="w-full h-full object-contain"
                                />
                            </motion.div>

                            {/* Loading Text */}
                            <motion.h2
                                className="text-xl font-semibold text-gray-800 mb-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                Please wait...
                            </motion.h2>

                            {/* Progress Bar */}
                            <motion.div
                                className="w-full bg-gray-200 rounded-full h-2 overflow-hidden"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                            >
                                <motion.div
                                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{
                                        duration: 5,
                                        ease: "linear",
                                        repeat: Infinity,
                                    }}
                                />
                            </motion.div>

                            {/* Subtext */}
                            <motion.p
                                className="text-sm text-gray-500 mt-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7, duration: 0.5 }}
                            >
                                AI is generating your course. This may take a few seconds.
                            </motion.p>
                        </motion.div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default LoadingDialog;
