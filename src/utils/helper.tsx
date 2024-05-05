interface helperProps {
  format: {
    currency: (value: number) => string;
  };
}

export const helper: helperProps = {
  format: {
    currency: (value) =>
      new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
      }).format(value),
  },
};
