
export function ServiceDetails({ service }: any) {
  return (
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="font-medium leading-none">{service.name}</h4>
        <p className="text-sm text-muted-foreground">
          {service.description}
        </p>
      </div>
      <div className="grid gap-2">
        <div className="grid grid-cols-2 items-center gap-4">
          <span className="text-sm">Price:</span>
          <span className="text-sm font-medium">
            {service.price}
          </span>
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
          <span className="text-sm">Duration:</span>
          <span className="text-sm font-medium">
            {service.duration} minutes
          </span>
        </div>
      </div>
    </div>
  );
}