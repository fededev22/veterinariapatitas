/**
 * Animaciones Lottie chicas, dibujadas a mano para íconos de servicios.
 * No dependen de una URL externa.
 */

type Vec = [number, number];

function fill(rgb: [number, number, number]) {
  return {
    ty: "fl",
    c: { a: 0, k: [rgb[0], rgb[1], rgb[2], 1] },
    o: { a: 0, k: 100 },
    nm: "fill",
  };
}

function ellipse(size: Vec, pos: Vec) {
  return {
    ty: "el",
    p: { a: 0, k: pos },
    s: { a: 0, k: size },
    nm: "ellipse",
  };
}

function star(points: number, outer: number, inner: number) {
  return {
    ty: "sr",
    sy: 1,
    d: 1,
    pt: { a: 0, k: points },
    p: { a: 0, k: [0, 0] },
    r: { a: 0, k: -18 },
    ir: { a: 0, k: inner },
    is: { a: 0, k: 0 },
    or: { a: 0, k: outer },
    os: { a: 0, k: 0 },
    nm: "star",
  };
}

const bounce = {
  a: 1,
  k: [
    {
      t: 0,
      s: [88, 88, 100],
      i: { x: [0.45, 0.45, 0.45], y: [1, 1, 1] },
      o: { x: [0.2, 0.2, 0.2], y: [0, 0, 0] },
    },
    {
      t: 18,
      s: [112, 112, 100],
      i: { x: [0.45, 0.45, 0.45], y: [1, 1, 1] },
      o: { x: [0.2, 0.2, 0.2], y: [0, 0, 0] },
    },
    { t: 40, s: [88, 88, 100] },
  ],
};

function clip(name: string, shapes: object[]) {
  return {
    v: "5.7.4",
    fr: 30,
    ip: 0,
    op: 40,
    w: 200,
    h: 200,
    nm: name,
    ddd: 0,
    assets: [],
    layers: [
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: name,
        sr: 1,
        ks: {
          o: { a: 0, k: 100 },
          r: { a: 0, k: 0 },
          p: { a: 0, k: [100, 108, 0] },
          a: { a: 0, k: [0, 0, 0] },
          s: bounce,
        },
        ao: 0,
        shapes,
        ip: 0,
        op: 40,
        st: 0,
        bm: 0,
      },
    ],
  };
}

const coral: [number, number, number] = [0.78, 0.27, 0.18];
const mint: [number, number, number] = [0.18, 0.62, 0.55];
const butter: [number, number, number] = [1, 0.82, 0.35];

export const lotties = {
  paw: clip("paw", [
    ellipse([46, 38], [0, 18]),
    ellipse([20, 24], [-34, -22]),
    ellipse([20, 24], [-12, -36]),
    ellipse([20, 24], [14, -36]),
    ellipse([20, 24], [36, -20]),
    fill(coral),
  ]),
  heart: clip("heart", [
    ellipse([52, 52], [-20, -14]),
    ellipse([52, 52], [20, -14]),
    ellipse([58, 50], [0, 16]),
    fill(coral),
  ]),
  spark: clip("spark", [star(5, 48, 22), fill(butter)]),
  drop: clip("drop", [ellipse([46, 68], [0, 4]), fill(mint)]),
};

export type LottieName = keyof typeof lotties;
