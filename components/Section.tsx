import { PropsWithChildren } from 'react';

interface SectionProps extends PropsWithChildren {
  id?: string;
  title?: string;
  description?: string;
  as?: keyof JSX.IntrinsicElements;
}

export default function Section({ id, title, description, as: Component = 'section', children }: SectionProps) {
  return (
    <Component id={id} className="py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {(title || description) && (
          <header className="mb-6 sm:mb-8 lg:mb-10 max-w-3xl">
            {title && <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-primary-900">{title}</h2>}
            {description && <p className="mt-3 sm:mt-4 text-base sm:text-lg text-primary-700">{description}</p>}
          </header>
        )}
        <div>{children}</div>
      </div>
    </Component>
  );
}
