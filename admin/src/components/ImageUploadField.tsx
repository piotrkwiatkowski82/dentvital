import { useRef, useState, type ChangeEvent } from 'react';

interface Props {
  label: string;
  currentSrc?: string;
  onFileChange: (file: File) => void;
  accept?: string;
}

export default function ImageUploadField({
  label,
  currentSrc,
  onFileChange,
  accept = 'image/jpeg,image/png,image/webp',
}: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    onFileChange(file);
  }

  const displaySrc = preview ?? currentSrc;

  return (
    <div className="image-upload-field">
      <label className="field-label">{label}</label>
      {displaySrc && (
        <div className="image-preview">
          <img src={displaySrc} alt="Podgląd" />
        </div>
      )}
      <div className="file-input-row">
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="file-input"
        />
        <button
          type="button"
          className="btn-secondary"
          onClick={() => inputRef.current?.click()}
        >
          Wybierz plik
        </button>
        {preview && <span className="file-selected-hint">Nowy plik wybrany</span>}
      </div>
    </div>
  );
}
