'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import {
    Bold,
    Italic,
    Heading1,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    LinkIcon,
    ImageIcon,
    Undo,
    Redo,
} from 'lucide-react';

interface RichTextEditorProps {
    content: string;
    onChange: (html: string) => void;
    placeholder?: string;
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: { levels: [1, 2, 3] },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: { class: 'text-gold underline' },
            }),
            Image.configure({
                HTMLAttributes: { class: 'rounded-lg max-w-full h-auto' },
            }),
        ],
        content,
        editorProps: {
            attributes: {
                class: 'focus:outline-none',
            },
        },
        onUpdate: ({ editor: ed }) => {
            onChange(ed.getHTML());
        },
        immediatelyRender: false,
    });

    if (!editor) {
        return (
            <div className="border border-gray-200 rounded-xl bg-white">
                <div className="h-12 border-b border-gray-100 bg-gray-50 rounded-t-xl" />
                <div className="p-4 min-h-[300px] flex items-center justify-center text-gray-300 text-sm">
                    Loading editor…
                </div>
            </div>
        );
    }

    const addLink = () => {
        const url = window.prompt('Enter URL:');
        if (url) {
            editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
        }
    };

    const addImage = () => {
        const url = window.prompt('Enter image URL:');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    type ToolbarButton = {
        icon: typeof Bold;
        label: string;
        action: () => void;
        isActive?: boolean;
    };

    const toolbarButtons: (ToolbarButton | 'separator')[] = [
        {
            icon: Heading1,
            label: 'Heading 1',
            action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
            isActive: editor.isActive('heading', { level: 1 }),
        },
        {
            icon: Heading2,
            label: 'Heading 2',
            action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            isActive: editor.isActive('heading', { level: 2 }),
        },
        {
            icon: Heading3,
            label: 'Heading 3',
            action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
            isActive: editor.isActive('heading', { level: 3 }),
        },
        'separator',
        {
            icon: Bold,
            label: 'Bold',
            action: () => editor.chain().focus().toggleBold().run(),
            isActive: editor.isActive('bold'),
        },
        {
            icon: Italic,
            label: 'Italic',
            action: () => editor.chain().focus().toggleItalic().run(),
            isActive: editor.isActive('italic'),
        },
        'separator',
        {
            icon: List,
            label: 'Bullet List',
            action: () => editor.chain().focus().toggleBulletList().run(),
            isActive: editor.isActive('bulletList'),
        },
        {
            icon: ListOrdered,
            label: 'Ordered List',
            action: () => editor.chain().focus().toggleOrderedList().run(),
            isActive: editor.isActive('orderedList'),
        },
        'separator',
        {
            icon: LinkIcon,
            label: 'Link',
            action: addLink,
            isActive: editor.isActive('link'),
        },
        {
            icon: ImageIcon,
            label: 'Image',
            action: addImage,
        },
        'separator',
        {
            icon: Undo,
            label: 'Undo',
            action: () => editor.chain().focus().undo().run(),
        },
        {
            icon: Redo,
            label: 'Redo',
            action: () => editor.chain().focus().redo().run(),
        },
    ];

    return (
        <div className="tiptap-editor border border-gray-200 rounded-xl bg-white overflow-hidden">
            {/* Toolbar */}
            <div className="flex items-center gap-0.5 px-3 py-2 border-b border-gray-100 bg-gray-50/80 flex-wrap">
                {toolbarButtons.map((btn, i) => {
                    if (btn === 'separator') {
                        return <div key={`sep-${i}`} className="w-px h-6 bg-gray-200 mx-1" />;
                    }
                    const Icon = btn.icon;
                    return (
                        <button
                            key={btn.label}
                            type="button"
                            onClick={btn.action}
                            title={btn.label}
                            className={`p-1.5 rounded-lg transition-all ${
                                btn.isActive
                                    ? 'bg-gray-900 text-white'
                                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                            }`}
                        >
                            <Icon className="w-4 h-4" />
                        </button>
                    );
                })}
            </div>

            {/* Editor */}
            <EditorContent
                editor={editor}
                className="min-h-[300px]"
            />
        </div>
    );
}
