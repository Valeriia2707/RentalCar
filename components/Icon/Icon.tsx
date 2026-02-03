interface IconProps {
  id: string;
  className?: string;
}

export const Icon = ({ id, className }: IconProps) => {
  return (
    <svg className={className}>
      <use href={`/Icons.svg#${id}`} />
    </svg>
  );
};
