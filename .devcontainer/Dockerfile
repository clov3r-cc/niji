ARG DENO_VERSION=1.40.5
FROM denoland/deno:bin-$DENO_VERSION AS deno

FROM --platform=linux/amd64 mcr.microsoft.com/devcontainers/base:ubuntu

ARG USERNAME=vscode
ARG USER_UID=1000
ARG USER_GID=${USER_UID}

WORKDIR /opt

# Install deno

COPY --from=deno /deno /usr/local/bin/deno

# Install bun

ENV BUN_INSTALL=/bun
RUN sudo mkdir -p ${BUN_INSTALL} \
  && curl -fsSL https://bun.sh/install | bash \
  && chown -R ${USERNAME} ${BUN_INSTALL}

ENV PATH=${BUN_INSTALL}/bin:${PATH}

# Install Node.js to execute wrangler

RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash \
  && sudo apt-get update \
  && sudo apt-get install -y --no-install-recommends nodejs \
  && sudo apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# Set user

USER ${USERNAME}
