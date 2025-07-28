{
  description = "The astralfrontier.org website";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        builddeps = with pkgs; [
          nodejs_22
        ];
      in
      {
        packages.default = pkgs.buildNpmPackage {
          name = "astralfrontier.org";
          nativeBuildInputs = builddeps;
          src = self;
          npmDepsHash = "sha256-K0OBJ+8crfUo8bm25tnPEqlXk5n2xdJ3V8oey1U6Sto=";
          installPhase = ''
            mkdir $out
            cp -r out/. $out/
          '';
        };
        devShell = pkgs.mkShell {
          name = "astralfrontier.org";
          packages = builddeps;
        };
      }
    );
}
