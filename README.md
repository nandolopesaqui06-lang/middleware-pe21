# API Diego

## Testing

Run the test suite with:

```bash
npm test
```

Last verified output:

```text
> api_diego@1.0.0 test
> node --experimental-vm-modules ./node_modules/jest/bin/jest.js

(node:20336) ExperimentalWarning: VM Modules is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
(node:11004) ExperimentalWarning: VM Modules is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)

Test Suites: 2 passed, 2 total
Tests:       5 passed, 5 total
Snapshots:   0 total
Time:        1.412 s
Ran all test suites.
```

## Versionado

Un cambio compatible con versiones anteriores sería agregar un campo opcional como `observaciones` al cuerpo de `POST /v2/incripciones`. Es backwards-compatible porque los clientes existentes pueden seguir enviando exactamente los mismos campos, y el servidor puede tratar el nuevo dato como opcional sin romper la validación ni el contrato anterior.

Un breaking change sería renombrar `metodo_pago` a `metodoPago` o cambiar su tipo de dato. Eso rompe la compatibilidad porque los clientes actuales ya serializan el campo con el nombre y formato anterior; al cambiarlo, sus peticiones dejarían de cumplir el contrato y comenzarían a fallar con errores de validación o con datos ignorados por el servidor.