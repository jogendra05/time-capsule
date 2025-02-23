// CapsuleContext.tsx
import React, { createContext, useState, useCallback, useContext } from 'react';

interface MediaFile {
    file: File;
    preview: string;
    type: string;
}

interface CapsuleContextType {
    title: string;
    setTitle: (title: string) => void;
    description: string;
    setDescription: (description: string) => void;
    unlockDate: Date | null;
    setUnlockDate: (unlockDate: Date | null) => void;
    isPublic: boolean;
    setIsPublic: (isPublic: boolean) => void;
    imageFiles: MediaFile[];
    setImageFiles: (imageFiles: MediaFile[]) => void;
    videoFiles: MediaFile[];
    setVideoFiles: (videoFiles: MediaFile[]) => void;
    audioFiles: MediaFile[];
    setAudioFiles: (audioFiles: MediaFile[]) => void;
    uploadProgress: number;
    setUploadProgress: (uploadProgress: number) => void;
    addMediaFile: (file: File) => void; // Helper function to add media
    removeFile: (index: number, fileType: string) => void; // Helper to remove
}

const CapsuleContext = createContext<CapsuleContextType | undefined>(undefined);

export const CapsuleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [unlockDate, setUnlockDate] = useState<Date | null>(null);
    const [isPublic, setIsPublic] = useState(false);
    const [imageFiles, setImageFiles] = useState<MediaFile[]>([]);
    const [videoFiles, setVideoFiles] = useState<MediaFile[]>([]);
    const [audioFiles, setAudioFiles] = useState<MediaFile[]>([]);
    const [uploadProgress, setUploadProgress] = useState(0);

    const addMediaFile = useCallback((file: File) => {
        const fileType = file.type.split('/')[0];
        const newFile = {
            file,
            preview: URL.createObjectURL(file),
            type: fileType,
        };

        if (fileType === 'image') {
            setImageFiles(prev => [...prev, newFile]);
        } else if (fileType === 'video') {
            setVideoFiles(prev => [...prev, newFile]);
        } else if (fileType === 'audio') {
            setAudioFiles(prev => [...prev, newFile]);
        }
    }, []);

    const removeFile = useCallback((index: number, fileType: string) => {
        if (fileType === 'image') {
            setImageFiles(prev => {
                const newFiles = [...prev];
                URL.revokeObjectURL(newFiles[index].preview);
                newFiles.splice(index, 1);
                return newFiles;
            });
        } else if (fileType === 'video') {
            setVideoFiles(prev => {
                const newFiles = [...prev];
                URL.revokeObjectURL(newFiles[index].preview);
                newFiles.splice(index, 1);
                return newFiles;
            });
        } else if (fileType === 'audio') {
            setAudioFiles(prev => {
                const newFiles = [...prev];
                URL.revokeObjectURL(newFiles[index].preview);
                newFiles.splice(index, 1);
                return newFiles;
            });
        }
    }, []);

    const value: CapsuleContextType = {
        title,
        setTitle,
        description,
        setDescription,
        unlockDate,
        setUnlockDate,
        isPublic,
        setIsPublic,
        imageFiles,
        setImageFiles,
        videoFiles,
        setVideoFiles,
        audioFiles,
        setAudioFiles,
        uploadProgress,
        setUploadProgress,
        addMediaFile,
        removeFile,
    };

    return (
        <CapsuleContext.Provider value={value}>
            {children}
        </CapsuleContext.Provider>
    );
};

export const useCapsule = () => {
    const context = useContext(CapsuleContext);
    if (!context) {
        throw new Error('useCapsule must be used within a CapsuleProvider');
    }
    return context;
};