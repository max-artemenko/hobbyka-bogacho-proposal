import './styles';
/** Figma 1097:77919: завершённые шаги, текущий и будущие различаются также подписью. */
export function Stepper({
  steps,
  current,
}: {
  steps: readonly string[];
  current: number;
}) {
  return (
    <ol data-hk="stepper" aria-label="Этапы оформления">
      {steps.map((label, i) => (
        <li
          key={i}
          data-state={i < current ? 'done' : i === current ? 'current' : 'next'}
          aria-current={i === current ? 'step' : undefined}
        >
          <span aria-hidden="true">{i < current ? '✓' : i + 1}</span>
          <strong>{label}</strong>
          {i < current ? (
            <small className="hk-visually-hidden">Завершён</small>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
