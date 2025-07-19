export class VisualGraph {
	public positions: Array<{ x: number, y: number }>;

	constructor( positions: Array<{x : number, y: number }> ) {
		this.positions = positions;
	}
}

export class Matrix {
	public num_cols: number;
	public data: Array<number>;

	constructor( matrix_data: Array<number>, num_cols: number ) {
		this.num_cols = num_cols;
		this.data = matrix_data;
	}

	at(row: number, col: number): number {
		return this.data[row * this.num_cols + col];
	}
};

export class Graph {
	// The number of vertices in the graph
	public order: number;
	// The number of edges in the graph
	public size: number;
	// The adjacency matrix data of the graph
	public matrix: Matrix;
	// The vertex location of the visual representation
	public vertex_positions: Array<{ x: number, y: number }>;

	static UNSPECIFIED: number = -1;
	static MISSING: number = 0;
	static RED: number = 1;
	static BLUE: number = 2;

	constructor(matrix: Matrix) {
		this.order = matrix.num_cols;
		this.size = 0;
		this.matrix = matrix;

		const graph_radius = 10;
		const graph_angle = 2 * Math.PI / this.order;
		this.vertex_positions = [];
		for (let i = 0; i < this.order; i += 1) {
			this.vertex_positions.push({
				x: graph_radius * Math.cos(i * graph_angle),
				y: graph_radius * Math.sin(i * graph_angle),
			})
		}
	}

	static from_id(order: number, graph_id: number): Graph {
		if (order === null || order < 2) { order = 2; }
		if (graph_id === null) { graph_id = 0; }

		const num_edges = order * (order - 1) / 2;
		if (graph_id >= 2**num_edges) { graph_id = 2 ** num_edges - 1; }

		const initial_edge_sequence = (graph_id >> 0).toString(2);
		const edge_sequence = ('0'.repeat(num_edges - initial_edge_sequence.length) + initial_edge_sequence)
			.split("")
			.reverse()
		;

		const matrix_data: Array<number> = Array(order * order).fill(this.UNSPECIFIED)

		for (let i = 0; i < num_edges; i += 1) {
			const row = Math.floor(
				order - 0.5 - Math.sqrt((order - 0.5) * (order - 0.5) - 2 * i)
			);
			const col = row + 1 + i + 0.5 * row * row - (order - 0.5) * row;
			matrix_data[row * order + col] = Number.parseInt(edge_sequence[i]);
			matrix_data[col * order + row] = Number.parseInt(edge_sequence[i]);
		}
		for (let diag_i = 0; diag_i < order; diag_i += 1) {
			matrix_data[diag_i * order + diag_i] = this.MISSING;
		}

		return new Graph(new Matrix(matrix_data, order));
	}

	static complete(order: number): Graph {
		return Graph.from_id(order, 2 ** (order * (order - 1) / 2) - 1);
	}

	static empty(order: number): Graph {
		return Graph.from_id(order, 0);
	}
};
