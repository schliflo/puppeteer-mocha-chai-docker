FROM schliflo/docker-puppeteer

USER root

RUN yarn global add \
    chai@4 \
    mocha@5 \
    && yarn cache clean

ENV NODE_PATH="/usr/local/share/.config/yarn/global/node_modules:${NODE_PATH}"

WORKDIR /validator/

ADD package.json /validator/
ADD utils /validator/utils/

# Add user so we don't need --no-sandbox.
RUN mkdir -p /home/pptruser/Downloads \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /usr/local/share/.config/yarn/global/node_modules \
    && chown -R pptruser:pptruser /app \
    && chown -R pptruser:pptruser /validator

# Run everything after as non-privileged user.
USER pptruser

ENTRYPOINT ["dumb-init", "--"]

# CMD ["/usr/local/share/.config/yarn/global/node_modules/puppeteer/.local-chromium/linux-526987/chrome-linux/chrome"]

CMD ["node", "index.js"]
