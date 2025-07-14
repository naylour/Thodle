// @bun
var M1 = Object.create;
var {
        getPrototypeOf: H1,
        defineProperty: s$,
        getOwnPropertyNames: LS,
        getOwnPropertyDescriptor: j1,
    } = Object,
    VS = Object.prototype.hasOwnProperty;
var K1 = ($, v, U) => {
        U = $ != null ? M1(H1($)) : {};
        let N =
            v || !$ || !$.__esModule
                ? s$(U, 'default', { value: $, enumerable: !0 })
                : U;
        for (let I of LS($))
            if (!VS.call(N, I)) s$(N, I, { get: () => $[I], enumerable: !0 });
        return N;
    },
    AS = new WeakMap(),
    w1 = ($) => {
        var v = AS.get($),
            U;
        if (v) return v;
        if (
            ((v = s$({}, '__esModule', { value: !0 })),
            ($ && typeof $ === 'object') || typeof $ === 'function')
        )
            LS($).map(
                (N) =>
                    !VS.call(v, N) &&
                    s$(v, N, {
                        get: () => $[N],
                        enumerable: !(U = j1($, N)) || U.enumerable,
                    }),
            );
        return AS.set($, v), v;
    },
    k = ($, v) => () => (v || $((v = { exports: {} }).exports, v), v.exports);
var Y$ = ($, v) => {
    for (var U in v)
        s$($, U, {
            get: v[U],
            enumerable: !0,
            configurable: !0,
            set: (N) => (v[U] = () => N),
        });
};
var t = import.meta.require;
var l6 = k((_O) => {
    Object.defineProperty(_O, '__esModule', { value: !0 });
    _O.matchFilter = bA;
    _O.parse = nO;
    _O.preprocess = yO;
    var RO = new Map();
    function bA($) {
        var v;
        let U = Array.isArray($) ? $ : [$],
            N = U.join(','),
            I =
                (v = RO.get(N)) !== null && v !== void 0
                    ? v
                    : (() => {
                          let P = nO(U),
                              S = uA(P);
                          return RO.set(N, S), S;
                      })();
        return (P) => I(P);
    }
    function nO($) {
        return Array.isArray($) ? $.map((v) => v.split(':')) : [$.split(':')];
    }
    function uA($) {
        let v = $.flatMap((I) => cA(I, yO(I))),
            U = EA(v),
            N = qA(U);
        return (I) => !!N(I.update, I);
    }
    function yO($) {
        let v = o6,
            U = [$]
                .flatMap((N) => {
                    let [I, P, S] = N;
                    if (!(I in gO)) return [N];
                    if (!I && !P && !S) return [N];
                    let J = gO[I].map((A) => [A, P, S]);
                    if (P === void 0) return J;
                    if (P in rP && (P || S)) return J;
                    return J.filter(([A]) => {
                        var D;
                        return !!((D = v[A]) === null || D === void 0
                            ? void 0
                            : D[P]);
                    });
                })
                .flatMap((N) => {
                    let [I, P, S] = N;
                    if (!(P in rP)) return [N];
                    if (!P && !S) return [N];
                    let J = rP[P].map((A) => [I, A, S]);
                    if (S === void 0) return J;
                    return J.filter(([, A]) => {
                        var D, G;
                        return !!((G =
                            (D = v[I]) === null || D === void 0
                                ? void 0
                                : D[A]) === null || G === void 0
                            ? void 0
                            : G[S]);
                    });
                });
        if (U.length === 0)
            throw new Error(
                `Shortcuts in '${$.join(':')}' do not expand to any valid filter query`,
            );
        return U;
    }
    function cA($, v) {
        if (v.length === 0) throw new Error('Empty filter query given');
        let U = v.map(FA).filter((N) => N !== !0);
        if (U.length === 0) return v;
        else if (U.length === 1) throw new Error(U[0]);
        else
            throw new Error(
                `Invalid filter query '${$.join(':')}'. There are ${U.length} errors after expanding the contained shortcuts: ${U.join('; ')}`,
            );
    }
    function FA($) {
        let [v, U, N, ...I] = $;
        if (v === void 0) return 'Empty filter query given';
        if (!(v in o6)) {
            let O = Object.keys(o6);
            return `Invalid L1 filter '${v}' given in '${$.join(':')}'. Permitted values are: ${O.map((J) => `'${J}'`).join(', ')}.`;
        }
        if (U === void 0) return !0;
        let P = o6[v];
        if (!(U in P)) {
            let O = Object.keys(P);
            return `Invalid L2 filter '${U}' given in '${$.join(':')}'. Permitted values are: ${O.map((J) => `'${J}'`).join(', ')}.`;
        }
        if (N === void 0) return !0;
        let S = P[U];
        if (!(N in S)) {
            let O = Object.keys(S);
            return `Invalid L3 filter '${N}' given in '${$.join(':')}'. ${O.length === 0 ? `No further filtering is possible after '${v}:${U}'.` : `Permitted values are: ${O.map((J) => `'${J}'`).join(', ')}.`}`;
        }
        if (I.length === 0) return !0;
        return `Cannot filter further than three levels, ':${I.join(':')}' is invalid!`;
    }
    function EA($) {
        var v, U;
        let N = {};
        for (let [I, P, S] of $) {
            let O = (v = N[I]) !== null && v !== void 0 ? v : (N[I] = {});
            if (P !== void 0) {
                let J =
                    (U = O[P]) !== null && U !== void 0
                        ? U
                        : (O[P] = new Set());
                if (S !== void 0) J.add(S);
            }
        }
        return N;
    }
    function CP($, v) {
        return (U, N) => $(U, N) || v(U, N);
    }
    function CO($, v) {
        return (U, N) => {
            let I = $(U, N);
            return I && v(I, N);
        };
    }
    function rO($) {
        return (v, U) => $(v, U) != null;
    }
    function qA($) {
        let v = Object.entries($).map(([U, N]) => {
            let I = (S) => S[U],
                P = Object.entries(N).map(([S, O]) => {
                    let J = (D) => D[S],
                        A = Array.from(O).map((D) => {
                            return D === 'me'
                                ? (W, z) => {
                                      let B = z.me.id;
                                      return TO(W, (Y) => Y.id === B);
                                  }
                                : (W) => TO(W, (z) => z[D] || z.type === D);
                        });
                    return A.length === 0 ? rO(J) : CO(J, A.reduce(CP));
                });
            return P.length === 0 ? rO(I) : CO(I, P.reduce(CP));
        });
        if (v.length === 0)
            throw new Error('Cannot create filter function for empty query');
        return v.reduce(CP);
    }
    function TO($, v) {
        let U = (N) => N != null && v(N);
        return Array.isArray($) ? $.some(U) : U($);
    }
    var xO = {
            mention: {},
            hashtag: {},
            cashtag: {},
            bot_command: {},
            url: {},
            email: {},
            phone_number: {},
            bold: {},
            italic: {},
            underline: {},
            strikethrough: {},
            spoiler: {},
            blockquote: {},
            expandable_blockquote: {},
            code: {},
            pre: {},
            text_link: {},
            text_mention: {},
            custom_emoji: {},
        },
        TP = {
            me: {},
            is_bot: {},
            is_premium: {},
            added_to_attachment_menu: {},
        },
        kA = { user: {}, hidden_user: {}, chat: {}, channel: {} },
        ZA = { is_video: {}, is_animated: {}, premium_animation: {} },
        xP = { emoji: {}, custom_emoji: {}, paid: {} },
        hO = {
            forward_origin: kA,
            is_topic_message: {},
            is_automatic_forward: {},
            business_connection_id: {},
            text: {},
            animation: {},
            audio: {},
            document: {},
            paid_media: {},
            photo: {},
            sticker: ZA,
            story: {},
            video: {},
            video_note: {},
            voice: {},
            contact: {},
            dice: {},
            game: {},
            poll: {},
            venue: {},
            location: {},
            entities: xO,
            caption_entities: xO,
            caption: {},
            link_preview_options: {
                url: {},
                prefer_small_media: {},
                prefer_large_media: {},
                show_above_text: {},
            },
            effect_id: {},
            paid_star_count: {},
            has_media_spoiler: {},
            new_chat_title: {},
            new_chat_photo: {},
            delete_chat_photo: {},
            message_auto_delete_timer_changed: {},
            pinned_message: {},
            invoice: {},
            proximity_alert_triggered: {},
            chat_background_set: {},
            giveaway_created: {},
            giveaway: { only_new_members: {}, has_public_winners: {} },
            giveaway_winners: { only_new_members: {}, was_refunded: {} },
            giveaway_completed: {},
            gift: {},
            unique_gift: {},
            paid_message_price_changed: {},
            video_chat_scheduled: {},
            video_chat_started: {},
            video_chat_ended: {},
            video_chat_participants_invited: {},
            web_app_data: {},
        },
        _6 = {
            ...hO,
            new_chat_members: TP,
            left_chat_member: TP,
            group_chat_created: {},
            supergroup_chat_created: {},
            migrate_to_chat_id: {},
            migrate_from_chat_id: {},
            successful_payment: {},
            refunded_payment: {},
            users_shared: {},
            chat_shared: {},
            connected_website: {},
            write_access_allowed: {},
            passport_data: {},
            boost_added: {},
            forum_topic_created: {},
            forum_topic_edited: { name: {}, icon_custom_emoji_id: {} },
            forum_topic_closed: {},
            forum_topic_reopened: {},
            general_forum_topic_hidden: {},
            general_forum_topic_unhidden: {},
            checklist: {
                others_can_add_tasks: {},
                others_can_mark_tasks_as_done: {},
            },
            checklist_tasks_done: {},
            checklist_tasks_added: {},
            sender_boost_count: {},
        },
        fO = {
            ...hO,
            channel_chat_created: {},
            direct_message_price_changed: {},
        },
        RA = { can_reply: {}, is_enabled: {} },
        CA = { old_reaction: xP, new_reaction: xP },
        rA = { reactions: xP },
        TA = { data: {}, game_short_name: {} },
        mO = { from: TP },
        o6 = {
            message: _6,
            edited_message: _6,
            channel_post: fO,
            edited_channel_post: fO,
            business_connection: RA,
            business_message: _6,
            edited_business_message: _6,
            deleted_business_messages: {},
            inline_query: {},
            chosen_inline_result: {},
            callback_query: TA,
            shipping_query: {},
            pre_checkout_query: {},
            poll: {},
            poll_answer: {},
            my_chat_member: mO,
            chat_member: mO,
            chat_join_request: {},
            message_reaction: CA,
            message_reaction_count: rA,
            chat_boost: {},
            removed_chat_boost: {},
            purchased_paid_media: {},
        },
        gO = {
            '': ['message', 'channel_post'],
            msg: ['message', 'channel_post'],
            edit: ['edited_message', 'edited_channel_post'],
        },
        rP = {
            '': ['entities', 'caption_entities'],
            media: ['photo', 'video'],
            file: [
                'photo',
                'animation',
                'audio',
                'document',
                'video',
                'video_note',
                'voice',
                'sticker',
            ],
        };
});
var i6 = k((oO) => {
    Object.defineProperty(oO, '__esModule', { value: !0 });
    oO.Context = void 0;
    var gA = l6(),
        v$ = {
            filterQuery($) {
                let v = gA.matchFilter($);
                return (U) => v(U);
            },
            text($) {
                let v = v$.filterQuery([':text', ':caption']),
                    U = c$($);
                return (N) => {
                    var I, P;
                    if (!v(N)) return !1;
                    let S =
                            (I = N.message) !== null && I !== void 0
                                ? I
                                : N.channelPost,
                        O =
                            (P = S.text) !== null && P !== void 0
                                ? P
                                : S.caption;
                    return F$(N, O, U);
                };
            },
            command($) {
                let v = v$.filterQuery(':entities:bot_command'),
                    U = new Set(),
                    N = new Set();
                return (
                    p6($).forEach((I) => {
                        if (I.startsWith('/'))
                            throw new Error(
                                `Do not include '/' when registering command handlers (use '${I.substring(1)}' not '${I}')`,
                            );
                        (I.includes('@') ? U : N).add(I);
                    }),
                    (I) => {
                        var P, S;
                        if (!v(I)) return !1;
                        let O =
                                (P = I.message) !== null && P !== void 0
                                    ? P
                                    : I.channelPost,
                            J =
                                (S = O.text) !== null && S !== void 0
                                    ? S
                                    : O.caption;
                        return O.entities.some((A) => {
                            if (A.type !== 'bot_command') return !1;
                            if (A.offset !== 0) return !1;
                            let D = J.substring(1, A.length);
                            if (N.has(D) || U.has(D))
                                return (
                                    (I.match = J.substring(
                                        D.length + 1,
                                    ).trimStart()),
                                    !0
                                );
                            let G = D.indexOf('@');
                            if (G === -1) return !1;
                            let W = D.substring(G + 1).toLowerCase(),
                                z = I.me.username.toLowerCase();
                            if (W !== z) return !1;
                            let B = D.substring(0, G);
                            if (N.has(B))
                                return (
                                    (I.match = J.substring(
                                        D.length + 1,
                                    ).trimStart()),
                                    !0
                                );
                            return !1;
                        });
                    }
                );
            },
            reaction($) {
                let v = v$.filterQuery('message_reaction'),
                    U =
                        typeof $ === 'string'
                            ? [{ type: 'emoji', emoji: $ }]
                            : (Array.isArray($) ? $ : [$]).map((S) =>
                                  typeof S === 'string'
                                      ? { type: 'emoji', emoji: S }
                                      : S,
                              ),
                    N = new Set(
                        U.filter((S) => S.type === 'emoji').map((S) => S.emoji),
                    ),
                    I = new Set(
                        U.filter((S) => S.type === 'custom_emoji').map(
                            (S) => S.custom_emoji_id,
                        ),
                    ),
                    P = U.some((S) => S.type === 'paid');
                return (S) => {
                    if (!v(S)) return !1;
                    let { old_reaction: O, new_reaction: J } =
                        S.messageReaction;
                    for (let A of J) {
                        let D = !1;
                        if (A.type === 'emoji')
                            for (let G of O) {
                                if (G.type !== 'emoji') continue;
                                if (G.emoji === A.emoji) {
                                    D = !0;
                                    break;
                                }
                            }
                        else if (A.type === 'custom_emoji')
                            for (let G of O) {
                                if (G.type !== 'custom_emoji') continue;
                                if (G.custom_emoji_id === A.custom_emoji_id) {
                                    D = !0;
                                    break;
                                }
                            }
                        else if (A.type === 'paid')
                            for (let G of O) {
                                if (G.type !== 'paid') continue;
                                D = !0;
                                break;
                            }
                        if (D) continue;
                        if (A.type === 'emoji') {
                            if (N.has(A.emoji)) return !0;
                        } else if (A.type === 'custom_emoji') {
                            if (I.has(A.custom_emoji_id)) return !0;
                        } else if (A.type === 'paid') {
                            if (P) return !0;
                        } else return !0;
                    }
                    return !1;
                };
            },
            chatType($) {
                let v = new Set(p6($));
                return (U) => {
                    var N;
                    return (
                        ((N = U.chat) === null || N === void 0
                            ? void 0
                            : N.type) !== void 0 && v.has(U.chat.type)
                    );
                };
            },
            callbackQuery($) {
                let v = v$.filterQuery('callback_query:data'),
                    U = c$($);
                return (N) => v(N) && F$(N, N.callbackQuery.data, U);
            },
            gameQuery($) {
                let v = v$.filterQuery('callback_query:game_short_name'),
                    U = c$($);
                return (N) => v(N) && F$(N, N.callbackQuery.game_short_name, U);
            },
            inlineQuery($) {
                let v = v$.filterQuery('inline_query'),
                    U = c$($);
                return (N) => v(N) && F$(N, N.inlineQuery.query, U);
            },
            chosenInlineResult($) {
                let v = v$.filterQuery('chosen_inline_result'),
                    U = c$($);
                return (N) => v(N) && F$(N, N.chosenInlineResult.result_id, U);
            },
            preCheckoutQuery($) {
                let v = v$.filterQuery('pre_checkout_query'),
                    U = c$($);
                return (N) =>
                    v(N) && F$(N, N.preCheckoutQuery.invoice_payload, U);
            },
            shippingQuery($) {
                let v = v$.filterQuery('shipping_query'),
                    U = c$($);
                return (N) => v(N) && F$(N, N.shippingQuery.invoice_payload, U);
            },
        };
    class _ {
        constructor($, v, U) {
            (this.update = $), (this.api = v), (this.me = U);
        }
        get message() {
            return this.update.message;
        }
        get editedMessage() {
            return this.update.edited_message;
        }
        get channelPost() {
            return this.update.channel_post;
        }
        get editedChannelPost() {
            return this.update.edited_channel_post;
        }
        get businessConnection() {
            return this.update.business_connection;
        }
        get businessMessage() {
            return this.update.business_message;
        }
        get editedBusinessMessage() {
            return this.update.edited_business_message;
        }
        get deletedBusinessMessages() {
            return this.update.deleted_business_messages;
        }
        get messageReaction() {
            return this.update.message_reaction;
        }
        get messageReactionCount() {
            return this.update.message_reaction_count;
        }
        get inlineQuery() {
            return this.update.inline_query;
        }
        get chosenInlineResult() {
            return this.update.chosen_inline_result;
        }
        get callbackQuery() {
            return this.update.callback_query;
        }
        get shippingQuery() {
            return this.update.shipping_query;
        }
        get preCheckoutQuery() {
            return this.update.pre_checkout_query;
        }
        get poll() {
            return this.update.poll;
        }
        get pollAnswer() {
            return this.update.poll_answer;
        }
        get myChatMember() {
            return this.update.my_chat_member;
        }
        get chatMember() {
            return this.update.chat_member;
        }
        get chatJoinRequest() {
            return this.update.chat_join_request;
        }
        get chatBoost() {
            return this.update.chat_boost;
        }
        get removedChatBoost() {
            return this.update.removed_chat_boost;
        }
        get purchasedPaidMedia() {
            return this.update.purchased_paid_media;
        }
        get msg() {
            var $, v, U, N, I, P, S;
            return (P =
                (I =
                    (N =
                        (U =
                            (v =
                                ($ = this.message) !== null && $ !== void 0
                                    ? $
                                    : this.editedMessage) !== null &&
                            v !== void 0
                                ? v
                                : this.channelPost) !== null && U !== void 0
                            ? U
                            : this.editedChannelPost) !== null && N !== void 0
                        ? N
                        : this.businessMessage) !== null && I !== void 0
                    ? I
                    : this.editedBusinessMessage) !== null && P !== void 0
                ? P
                : (S = this.callbackQuery) === null || S === void 0
                  ? void 0
                  : S.message;
        }
        get chat() {
            var $, v, U, N, I, P, S, O, J;
            return (J =
                (O =
                    (S =
                        (P =
                            (I =
                                (N =
                                    (U =
                                        (v =
                                            ($ = this.msg) !== null &&
                                            $ !== void 0
                                                ? $
                                                : this
                                                      .deletedBusinessMessages) !==
                                            null && v !== void 0
                                            ? v
                                            : this.messageReaction) !== null &&
                                    U !== void 0
                                        ? U
                                        : this.messageReactionCount) !== null &&
                                N !== void 0
                                    ? N
                                    : this.myChatMember) !== null &&
                            I !== void 0
                                ? I
                                : this.chatMember) !== null && P !== void 0
                            ? P
                            : this.chatJoinRequest) !== null && S !== void 0
                        ? S
                        : this.chatBoost) !== null && O !== void 0
                    ? O
                    : this.removedChatBoost) === null || J === void 0
                ? void 0
                : J.chat;
        }
        get senderChat() {
            var $;
            return ($ = this.msg) === null || $ === void 0
                ? void 0
                : $.sender_chat;
        }
        get from() {
            var $, v, U, N, I, P, S, O, J, A, D, G, W, z, B, Y, j;
            return (S =
                (P =
                    (v =
                        ($ = this.businessConnection) !== null && $ !== void 0
                            ? $
                            : this.messageReaction) !== null && v !== void 0
                        ? v
                        : (I =
                                (N =
                                    (U = this.chatBoost) === null ||
                                    U === void 0
                                        ? void 0
                                        : U.boost) !== null && N !== void 0
                                    ? N
                                    : this.removedChatBoost) === null ||
                            I === void 0
                          ? void 0
                          : I.source) === null || P === void 0
                    ? void 0
                    : P.user) !== null && S !== void 0
                ? S
                : (j =
                        (Y =
                            (B =
                                (z =
                                    (W =
                                        (G =
                                            (D =
                                                (A =
                                                    (J =
                                                        (O =
                                                            this
                                                                .callbackQuery) !==
                                                            null && O !== void 0
                                                            ? O
                                                            : this.msg) !==
                                                        null && J !== void 0
                                                        ? J
                                                        : this.inlineQuery) !==
                                                    null && A !== void 0
                                                    ? A
                                                    : this
                                                          .chosenInlineResult) !==
                                                null && D !== void 0
                                                ? D
                                                : this.shippingQuery) !==
                                            null && G !== void 0
                                            ? G
                                            : this.preCheckoutQuery) !== null &&
                                    W !== void 0
                                        ? W
                                        : this.myChatMember) !== null &&
                                z !== void 0
                                    ? z
                                    : this.chatMember) !== null && B !== void 0
                                ? B
                                : this.chatJoinRequest) !== null && Y !== void 0
                            ? Y
                            : this.purchasedPaidMedia) === null || j === void 0
                  ? void 0
                  : j.from;
        }
        get msgId() {
            var $, v, U, N, I;
            return (N =
                (v =
                    ($ = this.msg) === null || $ === void 0
                        ? void 0
                        : $.message_id) !== null && v !== void 0
                    ? v
                    : (U = this.messageReaction) === null || U === void 0
                      ? void 0
                      : U.message_id) !== null && N !== void 0
                ? N
                : (I = this.messageReactionCount) === null || I === void 0
                  ? void 0
                  : I.message_id;
        }
        get chatId() {
            var $, v, U;
            return (v =
                ($ = this.chat) === null || $ === void 0 ? void 0 : $.id) !==
                null && v !== void 0
                ? v
                : (U = this.businessConnection) === null || U === void 0
                  ? void 0
                  : U.user_chat_id;
        }
        get inlineMessageId() {
            var $, v, U;
            return (v =
                ($ = this.callbackQuery) === null || $ === void 0
                    ? void 0
                    : $.inline_message_id) !== null && v !== void 0
                ? v
                : (U = this.chosenInlineResult) === null || U === void 0
                  ? void 0
                  : U.inline_message_id;
        }
        get businessConnectionId() {
            var $, v, U, N, I;
            return (N =
                (v =
                    ($ = this.msg) === null || $ === void 0
                        ? void 0
                        : $.business_connection_id) !== null && v !== void 0
                    ? v
                    : (U = this.businessConnection) === null || U === void 0
                      ? void 0
                      : U.id) !== null && N !== void 0
                ? N
                : (I = this.deletedBusinessMessages) === null || I === void 0
                  ? void 0
                  : I.business_connection_id;
        }
        entities($) {
            var v, U;
            let N = this.msg;
            if (N === void 0) return [];
            let I = (v = N.text) !== null && v !== void 0 ? v : N.caption;
            if (I === void 0) return [];
            let P =
                (U = N.entities) !== null && U !== void 0
                    ? U
                    : N.caption_entities;
            if (P === void 0) return [];
            if ($ !== void 0) {
                let S = new Set(p6($));
                P = P.filter((O) => S.has(O.type));
            }
            return P.map((S) => ({
                ...S,
                text: I.substring(S.offset, S.offset + S.length),
            }));
        }
        reactions() {
            let $ = [],
                v = [],
                U = [],
                N = [],
                I = [],
                P = [],
                S = [],
                O = [],
                J = !1,
                A = !1,
                D = this.messageReaction;
            if (D !== void 0) {
                let { old_reaction: G, new_reaction: W } = D;
                for (let z of W)
                    if (z.type === 'emoji') $.push(z.emoji);
                    else if (z.type === 'custom_emoji')
                        I.push(z.custom_emoji_id);
                    else if (z.type === 'paid') J = A = !0;
                for (let z of G)
                    if (z.type === 'emoji') N.push(z.emoji);
                    else if (z.type === 'custom_emoji')
                        O.push(z.custom_emoji_id);
                    else if (z.type === 'paid') A = !1;
                v.push(...$), P.push(...I);
                for (let z = 0; z < N.length; z++) {
                    let B = v.length;
                    if (B === 0) break;
                    let Y = N[z];
                    for (let j = 0; j < B; j++)
                        if (Y === v[j]) {
                            U.push(Y), N.splice(z, 1), v.splice(j, 1), z--;
                            break;
                        }
                }
                for (let z = 0; z < O.length; z++) {
                    let B = P.length;
                    if (B === 0) break;
                    let Y = O[z];
                    for (let j = 0; j < B; j++)
                        if (Y === P[j]) {
                            S.push(Y), O.splice(z, 1), P.splice(j, 1), z--;
                            break;
                        }
                }
            }
            return {
                emoji: $,
                emojiAdded: v,
                emojiKept: U,
                emojiRemoved: N,
                customEmoji: I,
                customEmojiAdded: P,
                customEmojiKept: S,
                customEmojiRemoved: O,
                paid: J,
                paidAdded: A,
            };
        }
        has($) {
            return _.has.filterQuery($)(this);
        }
        hasText($) {
            return _.has.text($)(this);
        }
        hasCommand($) {
            return _.has.command($)(this);
        }
        hasReaction($) {
            return _.has.reaction($)(this);
        }
        hasChatType($) {
            return _.has.chatType($)(this);
        }
        hasCallbackQuery($) {
            return _.has.callbackQuery($)(this);
        }
        hasGameQuery($) {
            return _.has.gameQuery($)(this);
        }
        hasInlineQuery($) {
            return _.has.inlineQuery($)(this);
        }
        hasChosenInlineResult($) {
            return _.has.chosenInlineResult($)(this);
        }
        hasPreCheckoutQuery($) {
            return _.has.preCheckoutQuery($)(this);
        }
        hasShippingQuery($) {
            return _.has.shippingQuery($)(this);
        }
        reply($, v, U) {
            return this.api.sendMessage(
                V(this.chatId, 'sendMessage'),
                $,
                { business_connection_id: this.businessConnectionId, ...v },
                U,
            );
        }
        forwardMessage($, v, U) {
            return this.api.forwardMessage(
                $,
                V(this.chatId, 'forwardMessage'),
                V(this.msgId, 'forwardMessage'),
                v,
                U,
            );
        }
        forwardMessages($, v, U, N) {
            return this.api.forwardMessages(
                $,
                V(this.chatId, 'forwardMessages'),
                v,
                U,
                N,
            );
        }
        copyMessage($, v, U) {
            return this.api.copyMessage(
                $,
                V(this.chatId, 'copyMessage'),
                V(this.msgId, 'copyMessage'),
                v,
                U,
            );
        }
        copyMessages($, v, U, N) {
            return this.api.copyMessages(
                $,
                V(this.chatId, 'copyMessages'),
                v,
                U,
                N,
            );
        }
        replyWithPhoto($, v, U) {
            return this.api.sendPhoto(
                V(this.chatId, 'sendPhoto'),
                $,
                { business_connection_id: this.businessConnectionId, ...v },
                U,
            );
        }
        replyWithAudio($, v, U) {
            return this.api.sendAudio(
                V(this.chatId, 'sendAudio'),
                $,
                { business_connection_id: this.businessConnectionId, ...v },
                U,
            );
        }
        replyWithDocument($, v, U) {
            return this.api.sendDocument(
                V(this.chatId, 'sendDocument'),
                $,
                { business_connection_id: this.businessConnectionId, ...v },
                U,
            );
        }
        replyWithVideo($, v, U) {
            return this.api.sendVideo(
                V(this.chatId, 'sendVideo'),
                $,
                { business_connection_id: this.businessConnectionId, ...v },
                U,
            );
        }
        replyWithAnimation($, v, U) {
            return this.api.sendAnimation(
                V(this.chatId, 'sendAnimation'),
                $,
                { business_connection_id: this.businessConnectionId, ...v },
                U,
            );
        }
        replyWithVoice($, v, U) {
            return this.api.sendVoice(
                V(this.chatId, 'sendVoice'),
                $,
                { business_connection_id: this.businessConnectionId, ...v },
                U,
            );
        }
        replyWithVideoNote($, v, U) {
            return this.api.sendVideoNote(
                V(this.chatId, 'sendVideoNote'),
                $,
                { business_connection_id: this.businessConnectionId, ...v },
                U,
            );
        }
        replyWithMediaGroup($, v, U) {
            return this.api.sendMediaGroup(
                V(this.chatId, 'sendMediaGroup'),
                $,
                { business_connection_id: this.businessConnectionId, ...v },
                U,
            );
        }
        replyWithLocation($, v, U, N) {
            return this.api.sendLocation(
                V(this.chatId, 'sendLocation'),
                $,
                v,
                { business_connection_id: this.businessConnectionId, ...U },
                N,
            );
        }
        editMessageLiveLocation($, v, U, N) {
            let I = this.inlineMessageId;
            return I !== void 0
                ? this.api.editMessageLiveLocationInline(
                      I,
                      $,
                      v,
                      {
                          business_connection_id: this.businessConnectionId,
                          ...U,
                      },
                      N,
                  )
                : this.api.editMessageLiveLocation(
                      V(this.chatId, 'editMessageLiveLocation'),
                      V(this.msgId, 'editMessageLiveLocation'),
                      $,
                      v,
                      {
                          business_connection_id: this.businessConnectionId,
                          ...U,
                      },
                      N,
                  );
        }
        stopMessageLiveLocation($, v) {
            let U = this.inlineMessageId;
            return U !== void 0
                ? this.api.stopMessageLiveLocationInline(
                      U,
                      {
                          business_connection_id: this.businessConnectionId,
                          ...$,
                      },
                      v,
                  )
                : this.api.stopMessageLiveLocation(
                      V(this.chatId, 'stopMessageLiveLocation'),
                      V(this.msgId, 'stopMessageLiveLocation'),
                      {
                          business_connection_id: this.businessConnectionId,
                          ...$,
                      },
                      v,
                  );
        }
        sendPaidMedia($, v, U, N) {
            return this.api.sendPaidMedia(
                V(this.chatId, 'sendPaidMedia'),
                $,
                v,
                { business_connection_id: this.businessConnectionId, ...U },
                N,
            );
        }
        replyWithVenue($, v, U, N, I, P) {
            return this.api.sendVenue(
                V(this.chatId, 'sendVenue'),
                $,
                v,
                U,
                N,
                { business_connection_id: this.businessConnectionId, ...I },
                P,
            );
        }
        replyWithContact($, v, U, N) {
            return this.api.sendContact(
                V(this.chatId, 'sendContact'),
                $,
                v,
                { business_connection_id: this.businessConnectionId, ...U },
                N,
            );
        }
        replyWithPoll($, v, U, N) {
            return this.api.sendPoll(
                V(this.chatId, 'sendPoll'),
                $,
                v,
                { business_connection_id: this.businessConnectionId, ...U },
                N,
            );
        }
        replyWithChecklist($, v, U) {
            return this.api.sendChecklist(
                V(this.businessConnectionId, 'sendChecklist'),
                V(this.chatId, 'sendChecklist'),
                $,
                v,
                U,
            );
        }
        editMessageChecklist($, v, U) {
            var N, I, P, S;
            let O = V(this.msg, 'editMessageChecklist'),
                J =
                    (S =
                        (I =
                            (N = O.checklist_tasks_done) === null ||
                            N === void 0
                                ? void 0
                                : N.checklist_message) !== null && I !== void 0
                            ? I
                            : (P = O.checklist_tasks_added) === null ||
                                P === void 0
                              ? void 0
                              : P.checklist_message) !== null && S !== void 0
                        ? S
                        : O;
            return this.api.editMessageChecklist(
                V(this.businessConnectionId, 'editMessageChecklist'),
                V(J.chat.id, 'editMessageChecklist'),
                V(J.message_id, 'editMessageChecklist'),
                $,
                v,
                U,
            );
        }
        replyWithDice($, v, U) {
            return this.api.sendDice(
                V(this.chatId, 'sendDice'),
                $,
                { business_connection_id: this.businessConnectionId, ...v },
                U,
            );
        }
        replyWithChatAction($, v, U) {
            return this.api.sendChatAction(
                V(this.chatId, 'sendChatAction'),
                $,
                { business_connection_id: this.businessConnectionId, ...v },
                U,
            );
        }
        react($, v, U) {
            return this.api.setMessageReaction(
                V(this.chatId, 'setMessageReaction'),
                V(this.msgId, 'setMessageReaction'),
                typeof $ === 'string'
                    ? [{ type: 'emoji', emoji: $ }]
                    : (Array.isArray($) ? $ : [$]).map((N) =>
                          typeof N === 'string'
                              ? { type: 'emoji', emoji: N }
                              : N,
                      ),
                v,
                U,
            );
        }
        getUserProfilePhotos($, v) {
            return this.api.getUserProfilePhotos(
                V(this.from, 'getUserProfilePhotos').id,
                $,
                v,
            );
        }
        setUserEmojiStatus($, v) {
            return this.api.setUserEmojiStatus(
                V(this.from, 'setUserEmojiStatus').id,
                $,
                v,
            );
        }
        getUserChatBoosts($, v) {
            return this.api.getUserChatBoosts(
                $,
                V(this.from, 'getUserChatBoosts').id,
                v,
            );
        }
        getBusinessConnection($) {
            return this.api.getBusinessConnection(
                V(this.businessConnectionId, 'getBusinessConnection'),
                $,
            );
        }
        getFile($) {
            var v, U, N, I, P, S;
            let O = V(this.msg, 'getFile'),
                J =
                    O.photo !== void 0
                        ? O.photo[O.photo.length - 1]
                        : (S =
                                (P =
                                    (I =
                                        (N =
                                            (U =
                                                (v = O.animation) !== null &&
                                                v !== void 0
                                                    ? v
                                                    : O.audio) !== null &&
                                            U !== void 0
                                                ? U
                                                : O.document) !== null &&
                                        N !== void 0
                                            ? N
                                            : O.video) !== null && I !== void 0
                                        ? I
                                        : O.video_note) !== null && P !== void 0
                                    ? P
                                    : O.voice) !== null && S !== void 0
                          ? S
                          : O.sticker;
            return this.api.getFile(V(J, 'getFile').file_id, $);
        }
        kickAuthor(...$) {
            return this.banAuthor(...$);
        }
        banAuthor($, v) {
            return this.api.banChatMember(
                V(this.chatId, 'banAuthor'),
                V(this.from, 'banAuthor').id,
                $,
                v,
            );
        }
        kickChatMember(...$) {
            return this.banChatMember(...$);
        }
        banChatMember($, v, U) {
            return this.api.banChatMember(
                V(this.chatId, 'banChatMember'),
                $,
                v,
                U,
            );
        }
        unbanChatMember($, v, U) {
            return this.api.unbanChatMember(
                V(this.chatId, 'unbanChatMember'),
                $,
                v,
                U,
            );
        }
        restrictAuthor($, v, U) {
            return this.api.restrictChatMember(
                V(this.chatId, 'restrictAuthor'),
                V(this.from, 'restrictAuthor').id,
                $,
                v,
                U,
            );
        }
        restrictChatMember($, v, U, N) {
            return this.api.restrictChatMember(
                V(this.chatId, 'restrictChatMember'),
                $,
                v,
                U,
                N,
            );
        }
        promoteAuthor($, v) {
            return this.api.promoteChatMember(
                V(this.chatId, 'promoteAuthor'),
                V(this.from, 'promoteAuthor').id,
                $,
                v,
            );
        }
        promoteChatMember($, v, U) {
            return this.api.promoteChatMember(
                V(this.chatId, 'promoteChatMember'),
                $,
                v,
                U,
            );
        }
        setChatAdministratorAuthorCustomTitle($, v) {
            return this.api.setChatAdministratorCustomTitle(
                V(this.chatId, 'setChatAdministratorAuthorCustomTitle'),
                V(this.from, 'setChatAdministratorAuthorCustomTitle').id,
                $,
                v,
            );
        }
        setChatAdministratorCustomTitle($, v, U) {
            return this.api.setChatAdministratorCustomTitle(
                V(this.chatId, 'setChatAdministratorCustomTitle'),
                $,
                v,
                U,
            );
        }
        banChatSenderChat($, v) {
            return this.api.banChatSenderChat(
                V(this.chatId, 'banChatSenderChat'),
                $,
                v,
            );
        }
        unbanChatSenderChat($, v) {
            return this.api.unbanChatSenderChat(
                V(this.chatId, 'unbanChatSenderChat'),
                $,
                v,
            );
        }
        setChatPermissions($, v, U) {
            return this.api.setChatPermissions(
                V(this.chatId, 'setChatPermissions'),
                $,
                v,
                U,
            );
        }
        exportChatInviteLink($) {
            return this.api.exportChatInviteLink(
                V(this.chatId, 'exportChatInviteLink'),
                $,
            );
        }
        createChatInviteLink($, v) {
            return this.api.createChatInviteLink(
                V(this.chatId, 'createChatInviteLink'),
                $,
                v,
            );
        }
        editChatInviteLink($, v, U) {
            return this.api.editChatInviteLink(
                V(this.chatId, 'editChatInviteLink'),
                $,
                v,
                U,
            );
        }
        createChatSubscriptionInviteLink($, v, U, N) {
            return this.api.createChatSubscriptionInviteLink(
                V(this.chatId, 'createChatSubscriptionInviteLink'),
                $,
                v,
                U,
                N,
            );
        }
        editChatSubscriptionInviteLink($, v, U) {
            return this.api.editChatSubscriptionInviteLink(
                V(this.chatId, 'editChatSubscriptionInviteLink'),
                $,
                v,
                U,
            );
        }
        revokeChatInviteLink($, v) {
            return this.api.revokeChatInviteLink(
                V(this.chatId, 'editChatInviteLink'),
                $,
                v,
            );
        }
        approveChatJoinRequest($, v) {
            return this.api.approveChatJoinRequest(
                V(this.chatId, 'approveChatJoinRequest'),
                $,
                v,
            );
        }
        declineChatJoinRequest($, v) {
            return this.api.declineChatJoinRequest(
                V(this.chatId, 'declineChatJoinRequest'),
                $,
                v,
            );
        }
        setChatPhoto($, v) {
            return this.api.setChatPhoto(V(this.chatId, 'setChatPhoto'), $, v);
        }
        deleteChatPhoto($) {
            return this.api.deleteChatPhoto(
                V(this.chatId, 'deleteChatPhoto'),
                $,
            );
        }
        setChatTitle($, v) {
            return this.api.setChatTitle(V(this.chatId, 'setChatTitle'), $, v);
        }
        setChatDescription($, v) {
            return this.api.setChatDescription(
                V(this.chatId, 'setChatDescription'),
                $,
                v,
            );
        }
        pinChatMessage($, v, U) {
            return this.api.pinChatMessage(
                V(this.chatId, 'pinChatMessage'),
                $,
                { business_connection_id: this.businessConnectionId, ...v },
                U,
            );
        }
        unpinChatMessage($, v, U) {
            return this.api.unpinChatMessage(
                V(this.chatId, 'unpinChatMessage'),
                $,
                { business_connection_id: this.businessConnectionId, ...v },
                U,
            );
        }
        unpinAllChatMessages($) {
            return this.api.unpinAllChatMessages(
                V(this.chatId, 'unpinAllChatMessages'),
                $,
            );
        }
        leaveChat($) {
            return this.api.leaveChat(V(this.chatId, 'leaveChat'), $);
        }
        getChat($) {
            return this.api.getChat(V(this.chatId, 'getChat'), $);
        }
        getChatAdministrators($) {
            return this.api.getChatAdministrators(
                V(this.chatId, 'getChatAdministrators'),
                $,
            );
        }
        getChatMembersCount(...$) {
            return this.getChatMemberCount(...$);
        }
        getChatMemberCount($) {
            return this.api.getChatMemberCount(
                V(this.chatId, 'getChatMemberCount'),
                $,
            );
        }
        getAuthor($) {
            return this.api.getChatMember(
                V(this.chatId, 'getAuthor'),
                V(this.from, 'getAuthor').id,
                $,
            );
        }
        getChatMember($, v) {
            return this.api.getChatMember(
                V(this.chatId, 'getChatMember'),
                $,
                v,
            );
        }
        setChatStickerSet($, v) {
            return this.api.setChatStickerSet(
                V(this.chatId, 'setChatStickerSet'),
                $,
                v,
            );
        }
        deleteChatStickerSet($) {
            return this.api.deleteChatStickerSet(
                V(this.chatId, 'deleteChatStickerSet'),
                $,
            );
        }
        createForumTopic($, v, U) {
            return this.api.createForumTopic(
                V(this.chatId, 'createForumTopic'),
                $,
                v,
                U,
            );
        }
        editForumTopic($, v) {
            let U = V(this.msg, 'editForumTopic'),
                N = V(U.message_thread_id, 'editForumTopic');
            return this.api.editForumTopic(U.chat.id, N, $, v);
        }
        closeForumTopic($) {
            let v = V(this.msg, 'closeForumTopic'),
                U = V(v.message_thread_id, 'closeForumTopic');
            return this.api.closeForumTopic(v.chat.id, U, $);
        }
        reopenForumTopic($) {
            let v = V(this.msg, 'reopenForumTopic'),
                U = V(v.message_thread_id, 'reopenForumTopic');
            return this.api.reopenForumTopic(v.chat.id, U, $);
        }
        deleteForumTopic($) {
            let v = V(this.msg, 'deleteForumTopic'),
                U = V(v.message_thread_id, 'deleteForumTopic');
            return this.api.deleteForumTopic(v.chat.id, U, $);
        }
        unpinAllForumTopicMessages($) {
            let v = V(this.msg, 'unpinAllForumTopicMessages'),
                U = V(v.message_thread_id, 'unpinAllForumTopicMessages');
            return this.api.unpinAllForumTopicMessages(v.chat.id, U, $);
        }
        editGeneralForumTopic($, v) {
            return this.api.editGeneralForumTopic(
                V(this.chatId, 'editGeneralForumTopic'),
                $,
                v,
            );
        }
        closeGeneralForumTopic($) {
            return this.api.closeGeneralForumTopic(
                V(this.chatId, 'closeGeneralForumTopic'),
                $,
            );
        }
        reopenGeneralForumTopic($) {
            return this.api.reopenGeneralForumTopic(
                V(this.chatId, 'reopenGeneralForumTopic'),
                $,
            );
        }
        hideGeneralForumTopic($) {
            return this.api.hideGeneralForumTopic(
                V(this.chatId, 'hideGeneralForumTopic'),
                $,
            );
        }
        unhideGeneralForumTopic($) {
            return this.api.unhideGeneralForumTopic(
                V(this.chatId, 'unhideGeneralForumTopic'),
                $,
            );
        }
        unpinAllGeneralForumTopicMessages($) {
            return this.api.unpinAllGeneralForumTopicMessages(
                V(this.chatId, 'unpinAllGeneralForumTopicMessages'),
                $,
            );
        }
        answerCallbackQuery($, v) {
            return this.api.answerCallbackQuery(
                V(this.callbackQuery, 'answerCallbackQuery').id,
                typeof $ === 'string' ? { text: $ } : $,
                v,
            );
        }
        setChatMenuButton($, v) {
            return this.api.setChatMenuButton($, v);
        }
        getChatMenuButton($, v) {
            return this.api.getChatMenuButton($, v);
        }
        setMyDefaultAdministratorRights($, v) {
            return this.api.setMyDefaultAdministratorRights($, v);
        }
        getMyDefaultAdministratorRights($, v) {
            return this.api.getMyDefaultAdministratorRights($, v);
        }
        editMessageText($, v, U) {
            var N, I, P, S, O;
            let J = this.inlineMessageId;
            return J !== void 0
                ? this.api.editMessageTextInline(
                      J,
                      $,
                      {
                          business_connection_id: this.businessConnectionId,
                          ...v,
                      },
                      U,
                  )
                : this.api.editMessageText(
                      V(this.chatId, 'editMessageText'),
                      V(
                          (S =
                              (I =
                                  (N = this.msg) === null || N === void 0
                                      ? void 0
                                      : N.message_id) !== null && I !== void 0
                                  ? I
                                  : (P = this.messageReaction) === null ||
                                      P === void 0
                                    ? void 0
                                    : P.message_id) !== null && S !== void 0
                              ? S
                              : (O = this.messageReactionCount) === null ||
                                  O === void 0
                                ? void 0
                                : O.message_id,
                          'editMessageText',
                      ),
                      $,
                      {
                          business_connection_id: this.businessConnectionId,
                          ...v,
                      },
                      U,
                  );
        }
        editMessageCaption($, v) {
            var U, N, I, P, S;
            let O = this.inlineMessageId;
            return O !== void 0
                ? this.api.editMessageCaptionInline(
                      O,
                      {
                          business_connection_id: this.businessConnectionId,
                          ...$,
                      },
                      v,
                  )
                : this.api.editMessageCaption(
                      V(this.chatId, 'editMessageCaption'),
                      V(
                          (P =
                              (N =
                                  (U = this.msg) === null || U === void 0
                                      ? void 0
                                      : U.message_id) !== null && N !== void 0
                                  ? N
                                  : (I = this.messageReaction) === null ||
                                      I === void 0
                                    ? void 0
                                    : I.message_id) !== null && P !== void 0
                              ? P
                              : (S = this.messageReactionCount) === null ||
                                  S === void 0
                                ? void 0
                                : S.message_id,
                          'editMessageCaption',
                      ),
                      {
                          business_connection_id: this.businessConnectionId,
                          ...$,
                      },
                      v,
                  );
        }
        editMessageMedia($, v, U) {
            var N, I, P, S, O;
            let J = this.inlineMessageId;
            return J !== void 0
                ? this.api.editMessageMediaInline(
                      J,
                      $,
                      {
                          business_connection_id: this.businessConnectionId,
                          ...v,
                      },
                      U,
                  )
                : this.api.editMessageMedia(
                      V(this.chatId, 'editMessageMedia'),
                      V(
                          (S =
                              (I =
                                  (N = this.msg) === null || N === void 0
                                      ? void 0
                                      : N.message_id) !== null && I !== void 0
                                  ? I
                                  : (P = this.messageReaction) === null ||
                                      P === void 0
                                    ? void 0
                                    : P.message_id) !== null && S !== void 0
                              ? S
                              : (O = this.messageReactionCount) === null ||
                                  O === void 0
                                ? void 0
                                : O.message_id,
                          'editMessageMedia',
                      ),
                      $,
                      {
                          business_connection_id: this.businessConnectionId,
                          ...v,
                      },
                      U,
                  );
        }
        editMessageReplyMarkup($, v) {
            var U, N, I, P, S;
            let O = this.inlineMessageId;
            return O !== void 0
                ? this.api.editMessageReplyMarkupInline(
                      O,
                      {
                          business_connection_id: this.businessConnectionId,
                          ...$,
                      },
                      v,
                  )
                : this.api.editMessageReplyMarkup(
                      V(this.chatId, 'editMessageReplyMarkup'),
                      V(
                          (P =
                              (N =
                                  (U = this.msg) === null || U === void 0
                                      ? void 0
                                      : U.message_id) !== null && N !== void 0
                                  ? N
                                  : (I = this.messageReaction) === null ||
                                      I === void 0
                                    ? void 0
                                    : I.message_id) !== null && P !== void 0
                              ? P
                              : (S = this.messageReactionCount) === null ||
                                  S === void 0
                                ? void 0
                                : S.message_id,
                          'editMessageReplyMarkup',
                      ),
                      {
                          business_connection_id: this.businessConnectionId,
                          ...$,
                      },
                      v,
                  );
        }
        stopPoll($, v) {
            var U, N, I, P, S;
            return this.api.stopPoll(
                V(this.chatId, 'stopPoll'),
                V(
                    (P =
                        (N =
                            (U = this.msg) === null || U === void 0
                                ? void 0
                                : U.message_id) !== null && N !== void 0
                            ? N
                            : (I = this.messageReaction) === null ||
                                I === void 0
                              ? void 0
                              : I.message_id) !== null && P !== void 0
                        ? P
                        : (S = this.messageReactionCount) === null ||
                            S === void 0
                          ? void 0
                          : S.message_id,
                    'stopPoll',
                ),
                { business_connection_id: this.businessConnectionId, ...$ },
                v,
            );
        }
        deleteMessage($) {
            var v, U, N, I, P;
            return this.api.deleteMessage(
                V(this.chatId, 'deleteMessage'),
                V(
                    (I =
                        (U =
                            (v = this.msg) === null || v === void 0
                                ? void 0
                                : v.message_id) !== null && U !== void 0
                            ? U
                            : (N = this.messageReaction) === null ||
                                N === void 0
                              ? void 0
                              : N.message_id) !== null && I !== void 0
                        ? I
                        : (P = this.messageReactionCount) === null ||
                            P === void 0
                          ? void 0
                          : P.message_id,
                    'deleteMessage',
                ),
                $,
            );
        }
        deleteMessages($, v) {
            return this.api.deleteMessages(
                V(this.chatId, 'deleteMessages'),
                $,
                v,
            );
        }
        deleteBusinessMessages($, v) {
            return this.api.deleteBusinessMessages(
                V(this.businessConnectionId, 'deleteBusinessMessages'),
                $,
                v,
            );
        }
        setBusinessAccountName($, v, U) {
            return this.api.setBusinessAccountName(
                V(this.businessConnectionId, 'setBusinessAccountName'),
                $,
                v,
                U,
            );
        }
        setBusinessAccountUsername($, v) {
            return this.api.setBusinessAccountUsername(
                V(this.businessConnectionId, 'setBusinessAccountUsername'),
                $,
                v,
            );
        }
        setBusinessAccountBio($, v) {
            return this.api.setBusinessAccountBio(
                V(this.businessConnectionId, 'setBusinessAccountBio'),
                $,
                v,
            );
        }
        setBusinessAccountProfilePhoto($, v, U) {
            return this.api.setBusinessAccountProfilePhoto(
                V(this.businessConnectionId, 'setBusinessAccountProfilePhoto'),
                $,
                v,
                U,
            );
        }
        removeBusinessAccountProfilePhoto($, v) {
            return this.api.removeBusinessAccountProfilePhoto(
                V(
                    this.businessConnectionId,
                    'removeBusinessAccountProfilePhoto',
                ),
                $,
                v,
            );
        }
        setBusinessAccountGiftSettings($, v, U) {
            return this.api.setBusinessAccountGiftSettings(
                V(this.businessConnectionId, 'setBusinessAccountGiftSettings'),
                $,
                v,
                U,
            );
        }
        getBusinessAccountStarBalance($) {
            return this.api.getBusinessAccountStarBalance(
                V(this.businessConnectionId, 'getBusinessAccountStarBalance'),
                $,
            );
        }
        transferBusinessAccountStars($, v) {
            return this.api.transferBusinessAccountStars(
                V(this.businessConnectionId, 'transferBusinessAccountStars'),
                $,
                v,
            );
        }
        getBusinessAccountGifts($, v) {
            return this.api.getBusinessAccountGifts(
                V(this.businessConnectionId, 'getBusinessAccountGifts'),
                $,
                v,
            );
        }
        convertGiftToStars($, v) {
            return this.api.convertGiftToStars(
                V(this.businessConnectionId, 'convertGiftToStars'),
                $,
                v,
            );
        }
        upgradeGift($, v, U) {
            return this.api.upgradeGift(
                V(this.businessConnectionId, 'upgradeGift'),
                $,
                v,
                U,
            );
        }
        transferGift($, v, U, N) {
            return this.api.transferGift(
                V(this.businessConnectionId, 'transferGift'),
                $,
                v,
                U,
                N,
            );
        }
        postStory($, v, U, N) {
            return this.api.postStory(
                V(this.businessConnectionId, 'postStory'),
                $,
                v,
                U,
                N,
            );
        }
        editStory($, v, U, N) {
            return this.api.editStory(
                V(this.businessConnectionId, 'editStory'),
                $,
                v,
                U,
                N,
            );
        }
        deleteStory($, v) {
            return this.api.deleteStory(
                V(this.businessConnectionId, 'deleteStory'),
                $,
                v,
            );
        }
        replyWithSticker($, v, U) {
            return this.api.sendSticker(
                V(this.chatId, 'sendSticker'),
                $,
                { business_connection_id: this.businessConnectionId, ...v },
                U,
            );
        }
        getCustomEmojiStickers($) {
            var v, U;
            return this.api.getCustomEmojiStickers(
                ((U =
                    (v = this.msg) === null || v === void 0
                        ? void 0
                        : v.entities) !== null && U !== void 0
                    ? U
                    : []
                )
                    .filter((N) => N.type === 'custom_emoji')
                    .map((N) => N.custom_emoji_id),
                $,
            );
        }
        replyWithGift($, v, U) {
            return this.api.sendGift(V(this.from, 'sendGift').id, $, v, U);
        }
        giftPremiumSubscription($, v, U, N) {
            return this.api.giftPremiumSubscription(
                V(this.from, 'giftPremiumSubscription').id,
                $,
                v,
                U,
                N,
            );
        }
        replyWithGiftToChannel($, v, U) {
            return this.api.sendGiftToChannel(
                V(this.chat, 'sendGift').id,
                $,
                v,
                U,
            );
        }
        answerInlineQuery($, v, U) {
            return this.api.answerInlineQuery(
                V(this.inlineQuery, 'answerInlineQuery').id,
                $,
                v,
                U,
            );
        }
        savePreparedInlineMessage($, v, U) {
            return this.api.savePreparedInlineMessage(
                V(this.from, 'savePreparedInlineMessage').id,
                $,
                v,
                U,
            );
        }
        replyWithInvoice($, v, U, N, I, P, S) {
            return this.api.sendInvoice(
                V(this.chatId, 'sendInvoice'),
                $,
                v,
                U,
                N,
                I,
                P,
                S,
            );
        }
        answerShippingQuery($, v, U) {
            return this.api.answerShippingQuery(
                V(this.shippingQuery, 'answerShippingQuery').id,
                $,
                v,
                U,
            );
        }
        answerPreCheckoutQuery($, v, U) {
            return this.api.answerPreCheckoutQuery(
                V(this.preCheckoutQuery, 'answerPreCheckoutQuery').id,
                $,
                typeof v === 'string' ? { error_message: v } : v,
                U,
            );
        }
        refundStarPayment($) {
            var v;
            return this.api.refundStarPayment(
                V(this.from, 'refundStarPayment').id,
                V(
                    (v = this.msg) === null || v === void 0
                        ? void 0
                        : v.successful_payment,
                    'refundStarPayment',
                ).telegram_payment_charge_id,
                $,
            );
        }
        editUserStarSubscription($, v, U) {
            return this.api.editUserStarSubscription(
                V(this.from, 'editUserStarSubscription').id,
                $,
                v,
                U,
            );
        }
        verifyUser($, v) {
            return this.api.verifyUser(V(this.from, 'verifyUser').id, $, v);
        }
        verifyChat($, v) {
            return this.api.verifyChat(V(this.chatId, 'verifyChat'), $, v);
        }
        removeUserVerification($) {
            return this.api.removeUserVerification(
                V(this.from, 'removeUserVerification').id,
                $,
            );
        }
        removeChatVerification($) {
            return this.api.removeChatVerification(
                V(this.chatId, 'removeChatVerification'),
                $,
            );
        }
        readBusinessMessage($) {
            return this.api.readBusinessMessage(
                V(this.businessConnectionId, 'readBusinessMessage'),
                V(this.chatId, 'readBusinessMessage'),
                V(this.msgId, 'readBusinessMessage'),
                $,
            );
        }
        setPassportDataErrors($, v) {
            return this.api.setPassportDataErrors(
                V(this.from, 'setPassportDataErrors').id,
                $,
                v,
            );
        }
        replyWithGame($, v, U) {
            return this.api.sendGame(
                V(this.chatId, 'sendGame'),
                $,
                { business_connection_id: this.businessConnectionId, ...v },
                U,
            );
        }
    }
    oO.Context = _;
    _.has = v$;
    function V($, v) {
        if ($ === void 0)
            throw new Error(`Missing information for API call to ${v}`);
        return $;
    }
    function c$($) {
        return p6($).map((v) =>
            typeof v === 'string'
                ? (U) => (U === v ? v : null)
                : (U) => U.match(v),
        );
    }
    function F$($, v, U) {
        for (let N of U) {
            let I = N(v);
            if (I) return ($.match = I), !0;
        }
        return !1;
    }
    function p6($) {
        return Array.isArray($) ? $ : [$];
    }
});
var gP = k((tO) => {
    Object.defineProperty(tO, '__esModule', { value: !0 });
    tO.Composer = tO.BotError = void 0;
    tO.run = iO;
    var s = i6();
    class mP extends Error {
        constructor($, v) {
            super(nA($));
            if (
                ((this.error = $),
                (this.ctx = v),
                (this.name = 'BotError'),
                $ instanceof Error)
            )
                this.stack = $.stack;
        }
    }
    tO.BotError = mP;
    function nA($) {
        let v;
        if ($ instanceof Error) v = `${$.name} in middleware: ${$.message}`;
        else {
            let U = typeof $;
            switch (
                ((v = `Non-error value of type ${U} thrown in middleware`), U)
            ) {
                case 'bigint':
                case 'boolean':
                case 'number':
                case 'symbol':
                    v += `: ${$}`;
                    break;
                case 'string':
                    v += `: ${String($).substring(0, 50)}`;
                    break;
                default:
                    v += '!';
                    break;
            }
        }
        return v;
    }
    function xv($) {
        return typeof $ === 'function' ? $ : (v, U) => $.middleware()(v, U);
    }
    function pO($, v) {
        return async (U, N) => {
            let I = !1;
            await $(U, async () => {
                if (I) throw new Error('`next` already called before!');
                else I = !0;
                await v(U, N);
            });
        };
    }
    function fP($, v) {
        return v();
    }
    var yA = () => Promise.resolve();
    async function iO($, v) {
        await $(v, yA);
    }
    class E$ {
        constructor(...$) {
            this.handler = $.length === 0 ? fP : $.map(xv).reduce(pO);
        }
        middleware() {
            return this.handler;
        }
        use(...$) {
            let v = new E$(...$);
            return (this.handler = pO(this.handler, xv(v))), v;
        }
        on($, ...v) {
            return this.filter(s.Context.has.filterQuery($), ...v);
        }
        hears($, ...v) {
            return this.filter(s.Context.has.text($), ...v);
        }
        command($, ...v) {
            return this.filter(s.Context.has.command($), ...v);
        }
        reaction($, ...v) {
            return this.filter(s.Context.has.reaction($), ...v);
        }
        chatType($, ...v) {
            return this.filter(s.Context.has.chatType($), ...v);
        }
        callbackQuery($, ...v) {
            return this.filter(s.Context.has.callbackQuery($), ...v);
        }
        gameQuery($, ...v) {
            return this.filter(s.Context.has.gameQuery($), ...v);
        }
        inlineQuery($, ...v) {
            return this.filter(s.Context.has.inlineQuery($), ...v);
        }
        chosenInlineResult($, ...v) {
            return this.filter(s.Context.has.chosenInlineResult($), ...v);
        }
        preCheckoutQuery($, ...v) {
            return this.filter(s.Context.has.preCheckoutQuery($), ...v);
        }
        shippingQuery($, ...v) {
            return this.filter(s.Context.has.shippingQuery($), ...v);
        }
        filter($, ...v) {
            let U = new E$(...v);
            return this.branch($, U, fP), U;
        }
        drop($, ...v) {
            return this.filter(async (U) => !(await $(U)), ...v);
        }
        fork(...$) {
            let v = new E$(...$),
                U = xv(v);
            return this.use((N, I) => Promise.all([I(), iO(U, N)])), v;
        }
        lazy($) {
            return this.use(async (v, U) => {
                let N = await $(v),
                    I = Array.isArray(N) ? N : [N];
                await xv(new E$(...I))(v, U);
            });
        }
        route($, v, U = fP) {
            return this.lazy(async (N) => {
                var I;
                let P = await $(N);
                return (I = P === void 0 || !v[P] ? U : v[P]) !== null &&
                    I !== void 0
                    ? I
                    : [];
            });
        }
        branch($, v, U) {
            return this.lazy(async (N) => ((await $(N)) ? v : U));
        }
        errorBoundary($, ...v) {
            let U = new E$(...v),
                N = xv(U);
            return (
                this.use(async (I, P) => {
                    let S = !1,
                        O = () => ((S = !0), Promise.resolve());
                    try {
                        await N(I, O);
                    } catch (J) {
                        (S = !1), await $(new mP(J, I), O);
                    }
                    if (S) await P();
                }),
                U
            );
        }
    }
    tO.Composer = E$;
});
var aO = k((KW, eO) => {
    var o$ = 1000,
        l$ = o$ * 60,
        p$ = l$ * 60,
        q$ = p$ * 24,
        oA = q$ * 7,
        lA = q$ * 365.25;
    eO.exports = function ($, v) {
        v = v || {};
        var U = typeof $;
        if (U === 'string' && $.length > 0) return pA($);
        else if (U === 'number' && isFinite($)) return v.long ? tA($) : iA($);
        throw new Error(
            'val is not a non-empty string or a valid number. val=' +
                JSON.stringify($),
        );
    };
    function pA($) {
        if ((($ = String($)), $.length > 100)) return;
        var v =
            /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
                $,
            );
        if (!v) return;
        var U = parseFloat(v[1]),
            N = (v[2] || 'ms').toLowerCase();
        switch (N) {
            case 'years':
            case 'year':
            case 'yrs':
            case 'yr':
            case 'y':
                return U * lA;
            case 'weeks':
            case 'week':
            case 'w':
                return U * oA;
            case 'days':
            case 'day':
            case 'd':
                return U * q$;
            case 'hours':
            case 'hour':
            case 'hrs':
            case 'hr':
            case 'h':
                return U * p$;
            case 'minutes':
            case 'minute':
            case 'mins':
            case 'min':
            case 'm':
                return U * l$;
            case 'seconds':
            case 'second':
            case 'secs':
            case 'sec':
            case 's':
                return U * o$;
            case 'milliseconds':
            case 'millisecond':
            case 'msecs':
            case 'msec':
            case 'ms':
                return U;
            default:
                return;
        }
    }
    function iA($) {
        var v = Math.abs($);
        if (v >= q$) return Math.round($ / q$) + 'd';
        if (v >= p$) return Math.round($ / p$) + 'h';
        if (v >= l$) return Math.round($ / l$) + 'm';
        if (v >= o$) return Math.round($ / o$) + 's';
        return $ + 'ms';
    }
    function tA($) {
        var v = Math.abs($);
        if (v >= q$) return t6($, v, q$, 'day');
        if (v >= p$) return t6($, v, p$, 'hour');
        if (v >= l$) return t6($, v, l$, 'minute');
        if (v >= o$) return t6($, v, o$, 'second');
        return $ + ' ms';
    }
    function t6($, v, U, N) {
        var I = v >= U * 1.5;
        return Math.round($ / U) + ' ' + N + (I ? 's' : '');
    }
});
var nP = k((wW, sO) => {
    function dA($) {
        (U.debug = U),
            (U.default = U),
            (U.coerce = J),
            (U.disable = S),
            (U.enable = I),
            (U.enabled = O),
            (U.humanize = aO()),
            (U.destroy = A),
            Object.keys($).forEach((D) => {
                U[D] = $[D];
            }),
            (U.names = []),
            (U.skips = []),
            (U.formatters = {});
        function v(D) {
            let G = 0;
            for (let W = 0; W < D.length; W++)
                (G = (G << 5) - G + D.charCodeAt(W)), (G |= 0);
            return U.colors[Math.abs(G) % U.colors.length];
        }
        U.selectColor = v;
        function U(D) {
            let G,
                W = null,
                z,
                B;
            function Y(...j) {
                if (!Y.enabled) return;
                let K = Y,
                    b = Number(new Date()),
                    u = b - (G || b);
                if (
                    ((K.diff = u),
                    (K.prev = G),
                    (K.curr = b),
                    (G = b),
                    (j[0] = U.coerce(j[0])),
                    typeof j[0] !== 'string')
                )
                    j.unshift('%O');
                let E = 0;
                (j[0] = j[0].replace(/%([a-zA-Z%])/g, (i, R$) => {
                    if (i === '%%') return '%';
                    E++;
                    let B$ = U.formatters[R$];
                    if (typeof B$ === 'function') {
                        let P4 = j[E];
                        (i = B$.call(K, P4)), j.splice(E, 1), E--;
                    }
                    return i;
                })),
                    U.formatArgs.call(K, j),
                    (K.log || U.log).apply(K, j);
            }
            if (
                ((Y.namespace = D),
                (Y.useColors = U.useColors()),
                (Y.color = U.selectColor(D)),
                (Y.extend = N),
                (Y.destroy = U.destroy),
                Object.defineProperty(Y, 'enabled', {
                    enumerable: !0,
                    configurable: !1,
                    get: () => {
                        if (W !== null) return W;
                        if (z !== U.namespaces)
                            (z = U.namespaces), (B = U.enabled(D));
                        return B;
                    },
                    set: (j) => {
                        W = j;
                    },
                }),
                typeof U.init === 'function')
            )
                U.init(Y);
            return Y;
        }
        function N(D, G) {
            let W = U(
                this.namespace + (typeof G === 'undefined' ? ':' : G) + D,
            );
            return (W.log = this.log), W;
        }
        function I(D) {
            U.save(D), (U.namespaces = D), (U.names = []), (U.skips = []);
            let G = (typeof D === 'string' ? D : '')
                .trim()
                .replace(/\s+/g, ',')
                .split(',')
                .filter(Boolean);
            for (let W of G)
                if (W[0] === '-') U.skips.push(W.slice(1));
                else U.names.push(W);
        }
        function P(D, G) {
            let W = 0,
                z = 0,
                B = -1,
                Y = 0;
            while (W < D.length)
                if (z < G.length && (G[z] === D[W] || G[z] === '*'))
                    if (G[z] === '*') (B = z), (Y = W), z++;
                    else W++, z++;
                else if (B !== -1) (z = B + 1), Y++, (W = Y);
                else return !1;
            while (z < G.length && G[z] === '*') z++;
            return z === G.length;
        }
        function S() {
            let D = [...U.names, ...U.skips.map((G) => '-' + G)].join(',');
            return U.enable(''), D;
        }
        function O(D) {
            for (let G of U.skips) if (P(D, G)) return !1;
            for (let G of U.names) if (P(D, G)) return !0;
            return !1;
        }
        function J(D) {
            if (D instanceof Error) return D.stack || D.message;
            return D;
        }
        function A() {
            console.warn(
                'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.',
            );
        }
        return U.enable(U.load()), U;
    }
    sO.exports = dA;
});
var vz = k(($z, d6) => {
    $z.formatArgs = aA;
    $z.save = sA;
    $z.load = $0;
    $z.useColors = eA;
    $z.storage = v0();
    $z.destroy = (() => {
        let $ = !1;
        return () => {
            if (!$)
                ($ = !0),
                    console.warn(
                        'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.',
                    );
        };
    })();
    $z.colors = [
        '#0000CC',
        '#0000FF',
        '#0033CC',
        '#0033FF',
        '#0066CC',
        '#0066FF',
        '#0099CC',
        '#0099FF',
        '#00CC00',
        '#00CC33',
        '#00CC66',
        '#00CC99',
        '#00CCCC',
        '#00CCFF',
        '#3300CC',
        '#3300FF',
        '#3333CC',
        '#3333FF',
        '#3366CC',
        '#3366FF',
        '#3399CC',
        '#3399FF',
        '#33CC00',
        '#33CC33',
        '#33CC66',
        '#33CC99',
        '#33CCCC',
        '#33CCFF',
        '#6600CC',
        '#6600FF',
        '#6633CC',
        '#6633FF',
        '#66CC00',
        '#66CC33',
        '#9900CC',
        '#9900FF',
        '#9933CC',
        '#9933FF',
        '#99CC00',
        '#99CC33',
        '#CC0000',
        '#CC0033',
        '#CC0066',
        '#CC0099',
        '#CC00CC',
        '#CC00FF',
        '#CC3300',
        '#CC3333',
        '#CC3366',
        '#CC3399',
        '#CC33CC',
        '#CC33FF',
        '#CC6600',
        '#CC6633',
        '#CC9900',
        '#CC9933',
        '#CCCC00',
        '#CCCC33',
        '#FF0000',
        '#FF0033',
        '#FF0066',
        '#FF0099',
        '#FF00CC',
        '#FF00FF',
        '#FF3300',
        '#FF3333',
        '#FF3366',
        '#FF3399',
        '#FF33CC',
        '#FF33FF',
        '#FF6600',
        '#FF6633',
        '#FF9900',
        '#FF9933',
        '#FFCC00',
        '#FFCC33',
    ];
    function eA() {
        if (
            typeof window !== 'undefined' &&
            window.process &&
            (window.process.type === 'renderer' || window.process.__nwjs)
        )
            return !0;
        if (
            typeof navigator !== 'undefined' &&
            navigator.userAgent &&
            navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)
        )
            return !1;
        let $;
        return (
            (typeof document !== 'undefined' &&
                document.documentElement &&
                document.documentElement.style &&
                document.documentElement.style.WebkitAppearance) ||
            (typeof window !== 'undefined' &&
                window.console &&
                (window.console.firebug ||
                    (window.console.exception && window.console.table))) ||
            (typeof navigator !== 'undefined' &&
                navigator.userAgent &&
                ($ = navigator.userAgent
                    .toLowerCase()
                    .match(/firefox\/(\d+)/)) &&
                parseInt($[1], 10) >= 31) ||
            (typeof navigator !== 'undefined' &&
                navigator.userAgent &&
                navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
        );
    }
    function aA($) {
        if (
            (($[0] =
                (this.useColors ? '%c' : '') +
                this.namespace +
                (this.useColors ? ' %c' : ' ') +
                $[0] +
                (this.useColors ? '%c ' : ' ') +
                '+' +
                d6.exports.humanize(this.diff)),
            !this.useColors)
        )
            return;
        let v = 'color: ' + this.color;
        $.splice(1, 0, v, 'color: inherit');
        let U = 0,
            N = 0;
        $[0].replace(/%[a-zA-Z%]/g, (I) => {
            if (I === '%%') return;
            if ((U++, I === '%c')) N = U;
        }),
            $.splice(N, 0, v);
    }
    $z.log = console.debug || console.log || (() => {});
    function sA($) {
        try {
            if ($) $z.storage.setItem('debug', $);
            else $z.storage.removeItem('debug');
        } catch (v) {}
    }
    function $0() {
        let $;
        try {
            $ = $z.storage.getItem('debug') || $z.storage.getItem('DEBUG');
        } catch (v) {}
        if (!$ && typeof process !== 'undefined' && 'env' in process)
            $ = process.env.DEBUG;
        return $;
    }
    function v0() {
        try {
            return localStorage;
        } catch ($) {}
    }
    d6.exports = nP()($z);
    var { formatters: I0 } = d6.exports;
    I0.j = function ($) {
        try {
            return JSON.stringify($);
        } catch (v) {
            return '[UnexpectedJSONParseError]: ' + v.message;
        }
    };
});
var Uz = k((uW, Iz) => {
    Iz.exports = ($, v = process.argv) => {
        let U = $.startsWith('-') ? '' : $.length === 1 ? '-' : '--',
            N = v.indexOf(U + $),
            I = v.indexOf('--');
        return N !== -1 && (I === -1 || N < I);
    };
});
var Sz = k((cW, Pz) => {
    var J0 = t('os'),
        Nz = t('tty'),
        a = Uz(),
        { env: m } = process,
        X$;
    if (a('no-color') || a('no-colors') || a('color=false') || a('color=never'))
        X$ = 0;
    else if (a('color') || a('colors') || a('color=true') || a('color=always'))
        X$ = 1;
    if ('FORCE_COLOR' in m)
        if (m.FORCE_COLOR === 'true') X$ = 1;
        else if (m.FORCE_COLOR === 'false') X$ = 0;
        else
            X$ =
                m.FORCE_COLOR.length === 0
                    ? 1
                    : Math.min(parseInt(m.FORCE_COLOR, 10), 3);
    function yP($) {
        if ($ === 0) return !1;
        return { level: $, hasBasic: !0, has256: $ >= 2, has16m: $ >= 3 };
    }
    function hP($, v) {
        if (X$ === 0) return 0;
        if (a('color=16m') || a('color=full') || a('color=truecolor')) return 3;
        if (a('color=256')) return 2;
        if ($ && !v && X$ === void 0) return 0;
        let U = X$ || 0;
        if (m.TERM === 'dumb') return U;
        if (process.platform === 'win32') {
            let N = J0.release().split('.');
            if (Number(N[0]) >= 10 && Number(N[2]) >= 10586)
                return Number(N[2]) >= 14931 ? 3 : 2;
            return 1;
        }
        if ('CI' in m) {
            if (
                [
                    'TRAVIS',
                    'CIRCLECI',
                    'APPVEYOR',
                    'GITLAB_CI',
                    'GITHUB_ACTIONS',
                    'BUILDKITE',
                ].some((N) => N in m) ||
                m.CI_NAME === 'codeship'
            )
                return 1;
            return U;
        }
        if ('TEAMCITY_VERSION' in m)
            return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(m.TEAMCITY_VERSION)
                ? 1
                : 0;
        if (m.COLORTERM === 'truecolor') return 3;
        if ('TERM_PROGRAM' in m) {
            let N = parseInt((m.TERM_PROGRAM_VERSION || '').split('.')[0], 10);
            switch (m.TERM_PROGRAM) {
                case 'iTerm.app':
                    return N >= 3 ? 3 : 2;
                case 'Apple_Terminal':
                    return 2;
            }
        }
        if (/-256(color)?$/i.test(m.TERM)) return 2;
        if (
            /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(
                m.TERM,
            )
        )
            return 1;
        if ('COLORTERM' in m) return 1;
        return U;
    }
    function A0($) {
        let v = hP($, $ && $.isTTY);
        return yP(v);
    }
    Pz.exports = {
        supportsColor: A0,
        stdout: yP(hP(!0, Nz.isatty(1))),
        stderr: yP(hP(!0, Nz.isatty(2))),
    };
});
var Jz = k((zz, a6) => {
    var L0 = t('tty'),
        e6 = t('util');
    zz.init = Q0;
    zz.log = W0;
    zz.formatArgs = G0;
    zz.save = B0;
    zz.load = Y0;
    zz.useColors = V0;
    zz.destroy = e6.deprecate(
        () => {},
        'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.',
    );
    zz.colors = [6, 2, 3, 4, 5, 1];
    try {
        let $ = Sz();
        if ($ && ($.stderr || $).level >= 2)
            zz.colors = [
                20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57,
                62, 63, 68, 69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99,
                112, 113, 128, 129, 134, 135, 148, 149, 160, 161, 162, 163, 164,
                165, 166, 167, 168, 169, 170, 171, 172, 173, 178, 179, 184, 185,
                196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208,
                209, 214, 215, 220, 221,
            ];
    } catch ($) {}
    zz.inspectOpts = Object.keys(process.env)
        .filter(($) => {
            return /^debug_/i.test($);
        })
        .reduce(($, v) => {
            let U = v
                    .substring(6)
                    .toLowerCase()
                    .replace(/_([a-z])/g, (I, P) => {
                        return P.toUpperCase();
                    }),
                N = process.env[v];
            if (/^(yes|on|true|enabled)$/i.test(N)) N = !0;
            else if (/^(no|off|false|disabled)$/i.test(N)) N = !1;
            else if (N === 'null') N = null;
            else N = Number(N);
            return ($[U] = N), $;
        }, {});
    function V0() {
        return 'colors' in zz.inspectOpts
            ? Boolean(zz.inspectOpts.colors)
            : L0.isatty(process.stderr.fd);
    }
    function G0($) {
        let { namespace: v, useColors: U } = this;
        if (U) {
            let N = this.color,
                I = '\x1B[3' + (N < 8 ? N : '8;5;' + N),
                P = `  ${I};1m${v} \x1B[0m`;
            ($[0] =
                P +
                $[0]
                    .split(`
`)
                    .join(
                        `
` + P,
                    )),
                $.push(I + 'm+' + a6.exports.humanize(this.diff) + '\x1B[0m');
        } else $[0] = X0() + v + ' ' + $[0];
    }
    function X0() {
        if (zz.inspectOpts.hideDate) return '';
        return new Date().toISOString() + ' ';
    }
    function W0(...$) {
        return process.stderr.write(
            e6.formatWithOptions(zz.inspectOpts, ...$) +
                `
`,
        );
    }
    function B0($) {
        if ($) process.env.DEBUG = $;
        else delete process.env.DEBUG;
    }
    function Y0() {
        return process.env.DEBUG;
    }
    function Q0($) {
        $.inspectOpts = {};
        let v = Object.keys(zz.inspectOpts);
        for (let U = 0; U < v.length; U++)
            $.inspectOpts[v[U]] = zz.inspectOpts[v[U]];
    }
    a6.exports = nP()(zz);
    var { formatters: Oz } = a6.exports;
    Oz.o = function ($) {
        return (
            (this.inspectOpts.colors = this.useColors),
            e6
                .inspect($, this.inspectOpts)
                .split(`
`)
                .map((v) => v.trim())
                .join(' ')
        );
    };
    Oz.O = function ($) {
        return (
            (this.inspectOpts.colors = this.useColors),
            e6.inspect($, this.inspectOpts)
        );
    };
});
var Az = k((EW, _P) => {
    if (
        typeof process === 'undefined' ||
        process.type === 'renderer' ||
        !1 ||
        process.__nwjs
    )
        _P.exports = vz();
    else _P.exports = Jz();
});
var W$ = k((oP) => {
    Object.defineProperty(oP, '__esModule', { value: !0 });
    oP.defaultAdapter = oP.itrToStream = oP.debug = void 0;
    oP.baseFetchConfig = C0;
    var c0 = t('http'),
        F0 = t('https'),
        E0 = t('stream'),
        q0 = Az();
    Object.defineProperty(oP, 'debug', {
        enumerable: !0,
        get: function () {
            return q0.debug;
        },
    });
    var k0 = ($) => E0.Readable.from($, { objectMode: !1 });
    oP.itrToStream = k0;
    var Z0 = new Map(),
        R0 = new Map();
    function Lz($, v, U) {
        let N = $.get(v);
        if (N === void 0) (N = U()), $.set(v, N);
        return N;
    }
    function C0($) {
        if ($.startsWith('https:'))
            return {
                compress: !0,
                agent: Lz(R0, $, () => new F0.Agent({ keepAlive: !0 })),
            };
        else if ($.startsWith('http:'))
            return { agent: Lz(Z0, $, () => new c0.Agent({ keepAlive: !0 })) };
        else return {};
    }
    oP.defaultAdapter = 'express';
});
var s6 = k((Xz) => {
    Object.defineProperty(Xz, '__esModule', { value: !0 });
    Xz.HttpError = Xz.GrammyError = void 0;
    Xz.toGrammyError = f0;
    Xz.toHttpError = g0;
    var x0 = W$(),
        Gz = x0.debug('grammy:warn');
    class lP extends Error {
        constructor($, v, U, N) {
            var I;
            super(`${$} (${v.error_code}: ${v.description})`);
            (this.method = U),
                (this.payload = N),
                (this.ok = !1),
                (this.name = 'GrammyError'),
                (this.error_code = v.error_code),
                (this.description = v.description),
                (this.parameters =
                    (I = v.parameters) !== null && I !== void 0 ? I : {});
        }
    }
    Xz.GrammyError = lP;
    function f0($, v, U) {
        switch ($.error_code) {
            case 401:
                Gz(
                    'Error 401 means that your bot token is wrong, talk to https://t.me/BotFather to check it.',
                );
                break;
            case 409:
                Gz(
                    'Error 409 means that you are running your bot several times on long polling. Consider revoking the bot token if you believe that no other instance is running.',
                );
                break;
        }
        return new lP(`Call to '${v}' failed!`, $, v, U);
    }
    class pP extends Error {
        constructor($, v) {
            super($);
            (this.error = v), (this.name = 'HttpError');
        }
    }
    Xz.HttpError = pP;
    function m0($) {
        return (
            typeof $ === 'object' &&
            $ !== null &&
            'status' in $ &&
            'statusText' in $
        );
    }
    function g0($, v) {
        return (U) => {
            let N = `Network request for '${$}' failed!`;
            if (m0(U)) N += ` (${U.status}: ${U.statusText})`;
            if (v && U instanceof Error) N += ` ${U.message}`;
            throw new pP(N, U);
        };
    }
});
var o0 = {};
var Qz = k((A$) => {
    var l0 =
            (A$ && A$.__createBinding) ||
            (Object.create
                ? function ($, v, U, N) {
                      if (N === void 0) N = U;
                      var I = Object.getOwnPropertyDescriptor(v, U);
                      if (
                          !I ||
                          ('get' in I
                              ? !v.__esModule
                              : I.writable || I.configurable)
                      )
                          I = {
                              enumerable: !0,
                              get: function () {
                                  return v[U];
                              },
                          };
                      Object.defineProperty($, N, I);
                  }
                : function ($, v, U, N) {
                      if (N === void 0) N = U;
                      $[N] = v[U];
                  }),
        p0 =
            (A$ && A$.__exportStar) ||
            function ($, v) {
                for (var U in $)
                    if (
                        U !== 'default' &&
                        !Object.prototype.hasOwnProperty.call(v, U)
                    )
                        l0(v, $, U);
            };
    Object.defineProperty(A$, '__esModule', { value: !0 });
    A$.InputFile = void 0;
    var Bz = t('fs'),
        i0 = t('node-fetch'),
        $4 = t('path'),
        t0 = W$(),
        d0 = t0.debug('grammy:warn');
    p0(w1(o0), A$);
    class iP {
        constructor($, v) {
            if (
                ((this.consumed = !1),
                (this.fileData = $),
                (v !== null && v !== void 0) || (v = this.guessFilename($)),
                (this.filename = v),
                typeof $ === 'string' &&
                    ($.startsWith('http:') || $.startsWith('https:')))
            )
                d0(
                    `InputFile received the local file path '${$}' that looks like a URL. Is this a mistake?`,
                );
        }
        guessFilename($) {
            if (typeof $ === 'string') return $4.basename($);
            if ('url' in $) return $4.basename($.url);
            if (!($ instanceof URL)) return;
            if ($.pathname !== '/') {
                let v = $4.basename($.pathname);
                if (v) return v;
            }
            return $4.basename($.hostname);
        }
        async toRaw() {
            if (this.consumed)
                throw new Error('Cannot reuse InputFile data source!');
            let $ = this.fileData;
            if (typeof $ === 'string') return Bz.createReadStream($);
            if ($ instanceof URL)
                return $.protocol === 'file'
                    ? Bz.createReadStream($.pathname)
                    : Yz($);
            if ('url' in $) return Yz($.url);
            if ($ instanceof Uint8Array) return $;
            if (typeof $ === 'function') return new iP(await $()).toRaw();
            return (this.consumed = !0), $;
        }
    }
    A$.InputFile = iP;
    async function* Yz($) {
        let { body: v } = await i0.default($);
        for await (let U of v) {
            if (typeof U === 'string')
                throw new Error(
                    `Could not transfer file, received string data instead of bytes from '${$}'`,
                );
            yield U;
        }
    }
});
var tP = k((Z$) => {
    var e0 =
            (Z$ && Z$.__createBinding) ||
            (Object.create
                ? function ($, v, U, N) {
                      if (N === void 0) N = U;
                      var I = Object.getOwnPropertyDescriptor(v, U);
                      if (
                          !I ||
                          ('get' in I
                              ? !v.__esModule
                              : I.writable || I.configurable)
                      )
                          I = {
                              enumerable: !0,
                              get: function () {
                                  return v[U];
                              },
                          };
                      Object.defineProperty($, N, I);
                  }
                : function ($, v, U, N) {
                      if (N === void 0) N = U;
                      $[N] = v[U];
                  }),
        a0 =
            (Z$ && Z$.__exportStar) ||
            function ($, v) {
                for (var U in $)
                    if (
                        U !== 'default' &&
                        !Object.prototype.hasOwnProperty.call(v, U)
                    )
                        e0(v, $, U);
            };
    Object.defineProperty(Z$, '__esModule', { value: !0 });
    a0(Qz(), Z$);
});
var Kz = k((jz) => {
    Object.defineProperty(jz, '__esModule', { value: !0 });
    jz.requiresFormDataUpload = eP;
    jz.createJsonPayload = $L;
    jz.createFormDataPayload = IL;
    var s0 = W$(),
        dP = tP();
    function eP($) {
        return (
            $ instanceof dP.InputFile ||
            (typeof $ === 'object' &&
                $ !== null &&
                Object.values($).some((v) =>
                    Array.isArray(v)
                        ? v.some(eP)
                        : v instanceof dP.InputFile || eP(v),
                ))
        );
    }
    function Mz($) {
        return JSON.stringify($, (v, U) =>
            U !== null && U !== void 0 ? U : void 0,
        );
    }
    function $L($) {
        return {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                connection: 'keep-alive',
            },
            body: Mz($),
        };
    }
    async function* vL($, v) {
        try {
            yield* $;
        } catch (U) {
            v(U);
        }
    }
    function IL($, v) {
        let U = UL(),
            N = NL($, U),
            I = vL(N, v),
            P = s0.itrToStream(I);
        return {
            method: 'POST',
            headers: {
                'content-type': `multipart/form-data; boundary=${U}`,
                connection: 'keep-alive',
            },
            body: P,
        };
    }
    function UL() {
        return '----------' + Hz(32);
    }
    function Hz($ = 16) {
        return Array.from(Array($))
            .map(() => Math.random().toString(36)[2] || 0)
            .join('');
    }
    var mv = new TextEncoder();
    async function* NL($, v) {
        let U = aP($);
        yield mv.encode(`--${v}\r
`);
        let N = mv.encode(`\r
--${v}\r
`),
            I = !0;
        for (let [P, S] of Object.entries($)) {
            if (S == null) continue;
            if (!I) yield N;
            yield PL(P, typeof S === 'object' ? Mz(S) : S), (I = !1);
        }
        for (let { id: P, origin: S, file: O } of U) {
            if (!I) yield N;
            yield* SL(P, S, O), (I = !1);
        }
        yield mv.encode(`\r
--${v}--\r
`);
    }
    function aP($) {
        if (typeof $ !== 'object' || $ === null) return [];
        return Object.entries($).flatMap(([v, U]) => {
            if (Array.isArray(U)) return U.flatMap((N) => aP(N));
            else if (U instanceof dP.InputFile) {
                let N = Hz();
                Object.assign($, { [v]: `attach://${N}` });
                let I =
                    v === 'media' && 'type' in $ && typeof $.type === 'string'
                        ? $.type
                        : v;
                return { id: N, origin: I, file: U };
            } else return aP(U);
        });
    }
    function PL($, v) {
        return mv.encode(`content-disposition:form-data;name="${$}"\r
\r
${v}`);
    }
    async function* SL($, v, U) {
        let N = U.filename || `${v}.${OL(v)}`;
        if (
            N.includes('\r') ||
            N.includes(`
`)
        )
            throw new Error(`File paths cannot contain carriage-return (\\r) or newline (\\n) characters! Filename for property '${v}' was:
"""
${N}
"""`);
        yield mv.encode(`content-disposition:form-data;name="${$}";filename=${N}\r
content-type:application/octet-stream\r
\r
`);
        let I = await U.toRaw();
        if (I instanceof Uint8Array) yield I;
        else yield* I;
    }
    function OL($) {
        switch ($) {
            case 'certificate':
                return 'pem';
            case 'photo':
            case 'thumbnail':
                return 'jpg';
            case 'voice':
                return 'ogg';
            case 'audio':
                return 'mp3';
            case 'animation':
            case 'video':
            case 'video_note':
                return 'mp4';
            case 'sticker':
                return 'webp';
            default:
                return 'dat';
        }
    }
});
var sP = k((v4) => {
    Object.defineProperty(v4, '__esModule', { value: !0 });
    v4.fetch = v4.AbortController = void 0;
    var AL = t('abort-controller');
    Object.defineProperty(v4, 'AbortController', {
        enumerable: !0,
        get: function () {
            return AL.AbortController;
        },
    });
    var LL = t('node-fetch');
    Object.defineProperty(v4, 'fetch', {
        enumerable: !0,
        get: function () {
            return LL.default;
        },
    });
});
var Ez = k((Fz) => {
    Object.defineProperty(Fz, '__esModule', { value: !0 });
    Fz.createRawApi = WL;
    var bz = W$(),
        wz = s6(),
        I4 = Kz(),
        GL = bz.debug('grammy:core');
    function XL($, v) {
        return (U, N, I) => v($, U, N, I);
    }
    class uz {
        constructor($, v = {}, U = {}) {
            var N, I, P, S, O, J;
            (this.token = $),
                (this.webhookReplyEnvelope = U),
                (this.hasUsedWebhookReply = !1),
                (this.installedTransformers = []),
                (this.call = async (z, B, Y) => {
                    let j = B !== null && B !== void 0 ? B : {};
                    if ((GL(`Calling ${z}`), Y !== void 0)) jL(z, j, Y);
                    let K = this.options,
                        b = I4.requiresFormDataUpload(j);
                    if (
                        this.webhookReplyEnvelope.send !== void 0 &&
                        !this.hasUsedWebhookReply &&
                        !b &&
                        K.canUseWebhookReply(z)
                    ) {
                        this.hasUsedWebhookReply = !0;
                        let nv = I4.createJsonPayload({ ...j, method: z });
                        return (
                            await this.webhookReplyEnvelope.send(nv.body),
                            { ok: !0, result: !0 }
                        );
                    }
                    let u = HL(Y),
                        E = QL(u, K.timeoutSeconds, z),
                        U$ = ML(u),
                        i = K.buildUrl(K.apiRoot, this.token, z, K.environment),
                        R$ = b
                            ? I4.createFormDataPayload(j, (nv) => U$.catch(nv))
                            : I4.createJsonPayload(j),
                        B$ = u.signal,
                        P4 = { ...K.baseFetchConfig, signal: B$, ...R$ },
                        Q1 = [
                            this.fetch(i instanceof URL ? i.href : i, P4).catch(
                                wz.toHttpError(z, K.sensitiveLogs),
                            ),
                            U$.promise,
                            E.promise,
                        ];
                    try {
                        return await (await Promise.race(Q1)).json();
                    } finally {
                        if (E.handle !== void 0) clearTimeout(E.handle);
                    }
                });
            let A =
                    (N = v.apiRoot) !== null && N !== void 0
                        ? N
                        : 'https://api.telegram.org',
                D = (I = v.environment) !== null && I !== void 0 ? I : 'prod',
                { fetch: G } = v,
                W = G !== null && G !== void 0 ? G : cz.fetch;
            if (
                ((this.options = {
                    apiRoot: A,
                    environment: D,
                    buildUrl:
                        (P = v.buildUrl) !== null && P !== void 0 ? P : BL,
                    timeoutSeconds:
                        (S = v.timeoutSeconds) !== null && S !== void 0
                            ? S
                            : 500,
                    baseFetchConfig: {
                        ...bz.baseFetchConfig(A),
                        ...v.baseFetchConfig,
                    },
                    canUseWebhookReply:
                        (O = v.canUseWebhookReply) !== null && O !== void 0
                            ? O
                            : () => !1,
                    sensitiveLogs:
                        (J = v.sensitiveLogs) !== null && J !== void 0 ? J : !1,
                    fetch: (...z) => W(...z),
                }),
                (this.fetch = this.options.fetch),
                this.options.apiRoot.endsWith('/'))
            )
                throw new Error(
                    `Remove the trailing '/' from the 'apiRoot' option (use '${this.options.apiRoot.substring(0, this.options.apiRoot.length - 1)}' instead of '${this.options.apiRoot}')`,
                );
        }
        use(...$) {
            return (
                (this.call = $.reduce(XL, this.call)),
                this.installedTransformers.push(...$),
                this
            );
        }
        async callApi($, v, U) {
            let N = await this.call($, v, U);
            if (N.ok) return N.result;
            else throw wz.toGrammyError(N, $, v);
        }
    }
    function WL($, v, U) {
        let N = new uz($, v, U),
            I = {
                get(J, A) {
                    return A === 'toJSON'
                        ? '__internal'
                        : A === 'getMe' ||
                            A === 'getWebhookInfo' ||
                            A === 'getForumTopicIconStickers' ||
                            A === 'getAvailableGifts' ||
                            A === 'logOut' ||
                            A === 'close' ||
                            A === 'getMyStarBalance'
                          ? N.callApi.bind(N, A, {})
                          : N.callApi.bind(N, A);
                },
                ...YL,
            },
            P = new Proxy({}, I),
            S = N.installedTransformers,
            O = {
                raw: P,
                installedTransformers: S,
                use: (...J) => {
                    return N.use(...J), O;
                },
            };
        return O;
    }
    var BL = ($, v, U, N) => {
            return `${$}/bot${v}/${N === 'test' ? 'test/' : ''}${U}`;
        },
        YL = {
            set() {
                return !1;
            },
            defineProperty() {
                return !1;
            },
            deleteProperty() {
                return !1;
            },
            ownKeys() {
                return [];
            },
        };
    function QL($, v, U) {
        let N = void 0;
        return {
            promise: new Promise((P, S) => {
                N = setTimeout(() => {
                    let O = `Request to '${U}' timed out after ${v} seconds`;
                    S(new Error(O)), $.abort();
                }, 1000 * v);
            }),
            handle: N,
        };
    }
    function ML($) {
        let v = (N) => {
            throw N;
        };
        return {
            promise: new Promise((N, I) => {
                v = (P) => {
                    I(P), $.abort();
                };
            }),
            catch: v,
        };
    }
    function HL($) {
        let v = new cz.AbortController();
        if ($ === void 0) return v;
        let U = $;
        function N() {
            v.abort(), U.removeEventListener('abort', N);
        }
        if (U.aborted) N();
        else U.addEventListener('abort', N);
        return { abort: N, signal: v.signal };
    }
    function jL($, v, U) {
        if (
            typeof (U === null || U === void 0
                ? void 0
                : U.addEventListener) === 'function'
        )
            return;
        let N = JSON.stringify(v);
        if (N.length > 20) N = N.substring(0, 16) + ' ...';
        let I = JSON.stringify(U);
        if (I.length > 20) I = I.substring(0, 16) + ' ...';
        throw new Error(`Incorrect abort signal instance found! You passed two payloads to '${$}' but you should merge the second one containing '${I}' into the first one containing '${N}'! If you are using context shortcuts, you may want to use a method on 'ctx.api' instead.

If you want to prevent such mistakes in the future, consider using TypeScript. https://www.typescriptlang.org/`);
    }
    var cz = sP();
});
var $S = k((kz) => {
    Object.defineProperty(kz, '__esModule', { value: !0 });
    kz.Api = void 0;
    var wL = Ez();
    class qz {
        constructor($, v, U) {
            (this.token = $), (this.options = v);
            let {
                raw: N,
                use: I,
                installedTransformers: P,
            } = wL.createRawApi($, v, U);
            (this.raw = N),
                (this.config = {
                    use: I,
                    installedTransformers: () => P.slice(),
                });
        }
        getUpdates($, v) {
            return this.raw.getUpdates({ ...$ }, v);
        }
        setWebhook($, v, U) {
            return this.raw.setWebhook({ url: $, ...v }, U);
        }
        deleteWebhook($, v) {
            return this.raw.deleteWebhook({ ...$ }, v);
        }
        getWebhookInfo($) {
            return this.raw.getWebhookInfo($);
        }
        getMe($) {
            return this.raw.getMe($);
        }
        logOut($) {
            return this.raw.logOut($);
        }
        close($) {
            return this.raw.close($);
        }
        sendMessage($, v, U, N) {
            return this.raw.sendMessage({ chat_id: $, text: v, ...U }, N);
        }
        forwardMessage($, v, U, N, I) {
            return this.raw.forwardMessage(
                { chat_id: $, from_chat_id: v, message_id: U, ...N },
                I,
            );
        }
        forwardMessages($, v, U, N, I) {
            return this.raw.forwardMessages(
                { chat_id: $, from_chat_id: v, message_ids: U, ...N },
                I,
            );
        }
        copyMessage($, v, U, N, I) {
            return this.raw.copyMessage(
                { chat_id: $, from_chat_id: v, message_id: U, ...N },
                I,
            );
        }
        copyMessages($, v, U, N, I) {
            return this.raw.copyMessages(
                { chat_id: $, from_chat_id: v, message_ids: U, ...N },
                I,
            );
        }
        sendPhoto($, v, U, N) {
            return this.raw.sendPhoto({ chat_id: $, photo: v, ...U }, N);
        }
        sendAudio($, v, U, N) {
            return this.raw.sendAudio({ chat_id: $, audio: v, ...U }, N);
        }
        sendDocument($, v, U, N) {
            return this.raw.sendDocument({ chat_id: $, document: v, ...U }, N);
        }
        sendVideo($, v, U, N) {
            return this.raw.sendVideo({ chat_id: $, video: v, ...U }, N);
        }
        sendAnimation($, v, U, N) {
            return this.raw.sendAnimation(
                { chat_id: $, animation: v, ...U },
                N,
            );
        }
        sendVoice($, v, U, N) {
            return this.raw.sendVoice({ chat_id: $, voice: v, ...U }, N);
        }
        sendVideoNote($, v, U, N) {
            return this.raw.sendVideoNote(
                { chat_id: $, video_note: v, ...U },
                N,
            );
        }
        sendMediaGroup($, v, U, N) {
            return this.raw.sendMediaGroup({ chat_id: $, media: v, ...U }, N);
        }
        sendLocation($, v, U, N, I) {
            return this.raw.sendLocation(
                { chat_id: $, latitude: v, longitude: U, ...N },
                I,
            );
        }
        editMessageLiveLocation($, v, U, N, I, P) {
            return this.raw.editMessageLiveLocation(
                { chat_id: $, message_id: v, latitude: U, longitude: N, ...I },
                P,
            );
        }
        editMessageLiveLocationInline($, v, U, N, I) {
            return this.raw.editMessageLiveLocation(
                { inline_message_id: $, latitude: v, longitude: U, ...N },
                I,
            );
        }
        stopMessageLiveLocation($, v, U, N) {
            return this.raw.stopMessageLiveLocation(
                { chat_id: $, message_id: v, ...U },
                N,
            );
        }
        stopMessageLiveLocationInline($, v, U) {
            return this.raw.stopMessageLiveLocation(
                { inline_message_id: $, ...v },
                U,
            );
        }
        sendPaidMedia($, v, U, N, I) {
            return this.raw.sendPaidMedia(
                { chat_id: $, star_count: v, media: U, ...N },
                I,
            );
        }
        sendVenue($, v, U, N, I, P, S) {
            return this.raw.sendVenue(
                {
                    chat_id: $,
                    latitude: v,
                    longitude: U,
                    title: N,
                    address: I,
                    ...P,
                },
                S,
            );
        }
        sendContact($, v, U, N, I) {
            return this.raw.sendContact(
                { chat_id: $, phone_number: v, first_name: U, ...N },
                I,
            );
        }
        sendPoll($, v, U, N, I) {
            let P = U.map((S) => (typeof S === 'string' ? { text: S } : S));
            return this.raw.sendPoll(
                { chat_id: $, question: v, options: P, ...N },
                I,
            );
        }
        sendChecklist($, v, U, N, I) {
            return this.raw.sendChecklist(
                { business_connection_id: $, chat_id: v, checklist: U, ...N },
                I,
            );
        }
        editMessageChecklist($, v, U, N, I, P) {
            return this.raw.editMessageChecklist(
                {
                    business_connection_id: $,
                    chat_id: v,
                    message_id: U,
                    checklist: N,
                    ...I,
                },
                P,
            );
        }
        sendDice($, v, U, N) {
            return this.raw.sendDice({ chat_id: $, emoji: v, ...U }, N);
        }
        setMessageReaction($, v, U, N, I) {
            return this.raw.setMessageReaction(
                { chat_id: $, message_id: v, reaction: U, ...N },
                I,
            );
        }
        sendChatAction($, v, U, N) {
            return this.raw.sendChatAction({ chat_id: $, action: v, ...U }, N);
        }
        getUserProfilePhotos($, v, U) {
            return this.raw.getUserProfilePhotos({ user_id: $, ...v }, U);
        }
        setUserEmojiStatus($, v, U) {
            return this.raw.setUserEmojiStatus({ user_id: $, ...v }, U);
        }
        getUserChatBoosts($, v, U) {
            return this.raw.getUserChatBoosts({ chat_id: $, user_id: v }, U);
        }
        getBusinessConnection($, v) {
            return this.raw.getBusinessConnection(
                { business_connection_id: $ },
                v,
            );
        }
        getFile($, v) {
            return this.raw.getFile({ file_id: $ }, v);
        }
        kickChatMember(...$) {
            return this.banChatMember(...$);
        }
        banChatMember($, v, U, N) {
            return this.raw.banChatMember({ chat_id: $, user_id: v, ...U }, N);
        }
        unbanChatMember($, v, U, N) {
            return this.raw.unbanChatMember(
                { chat_id: $, user_id: v, ...U },
                N,
            );
        }
        restrictChatMember($, v, U, N, I) {
            return this.raw.restrictChatMember(
                { chat_id: $, user_id: v, permissions: U, ...N },
                I,
            );
        }
        promoteChatMember($, v, U, N) {
            return this.raw.promoteChatMember(
                { chat_id: $, user_id: v, ...U },
                N,
            );
        }
        setChatAdministratorCustomTitle($, v, U, N) {
            return this.raw.setChatAdministratorCustomTitle(
                { chat_id: $, user_id: v, custom_title: U },
                N,
            );
        }
        banChatSenderChat($, v, U) {
            return this.raw.banChatSenderChat(
                { chat_id: $, sender_chat_id: v },
                U,
            );
        }
        unbanChatSenderChat($, v, U) {
            return this.raw.unbanChatSenderChat(
                { chat_id: $, sender_chat_id: v },
                U,
            );
        }
        setChatPermissions($, v, U, N) {
            return this.raw.setChatPermissions(
                { chat_id: $, permissions: v, ...U },
                N,
            );
        }
        exportChatInviteLink($, v) {
            return this.raw.exportChatInviteLink({ chat_id: $ }, v);
        }
        createChatInviteLink($, v, U) {
            return this.raw.createChatInviteLink({ chat_id: $, ...v }, U);
        }
        editChatInviteLink($, v, U, N) {
            return this.raw.editChatInviteLink(
                { chat_id: $, invite_link: v, ...U },
                N,
            );
        }
        createChatSubscriptionInviteLink($, v, U, N, I) {
            return this.raw.createChatSubscriptionInviteLink(
                {
                    chat_id: $,
                    subscription_period: v,
                    subscription_price: U,
                    ...N,
                },
                I,
            );
        }
        editChatSubscriptionInviteLink($, v, U, N) {
            return this.raw.editChatSubscriptionInviteLink(
                { chat_id: $, invite_link: v, ...U },
                N,
            );
        }
        revokeChatInviteLink($, v, U) {
            return this.raw.revokeChatInviteLink(
                { chat_id: $, invite_link: v },
                U,
            );
        }
        approveChatJoinRequest($, v, U) {
            return this.raw.approveChatJoinRequest(
                { chat_id: $, user_id: v },
                U,
            );
        }
        declineChatJoinRequest($, v, U) {
            return this.raw.declineChatJoinRequest(
                { chat_id: $, user_id: v },
                U,
            );
        }
        setChatPhoto($, v, U) {
            return this.raw.setChatPhoto({ chat_id: $, photo: v }, U);
        }
        deleteChatPhoto($, v) {
            return this.raw.deleteChatPhoto({ chat_id: $ }, v);
        }
        setChatTitle($, v, U) {
            return this.raw.setChatTitle({ chat_id: $, title: v }, U);
        }
        setChatDescription($, v, U) {
            return this.raw.setChatDescription(
                { chat_id: $, description: v },
                U,
            );
        }
        pinChatMessage($, v, U, N) {
            return this.raw.pinChatMessage(
                { chat_id: $, message_id: v, ...U },
                N,
            );
        }
        unpinChatMessage($, v, U, N) {
            return this.raw.unpinChatMessage(
                { chat_id: $, message_id: v, ...U },
                N,
            );
        }
        unpinAllChatMessages($, v) {
            return this.raw.unpinAllChatMessages({ chat_id: $ }, v);
        }
        leaveChat($, v) {
            return this.raw.leaveChat({ chat_id: $ }, v);
        }
        getChat($, v) {
            return this.raw.getChat({ chat_id: $ }, v);
        }
        getChatAdministrators($, v) {
            return this.raw.getChatAdministrators({ chat_id: $ }, v);
        }
        getChatMembersCount(...$) {
            return this.getChatMemberCount(...$);
        }
        getChatMemberCount($, v) {
            return this.raw.getChatMemberCount({ chat_id: $ }, v);
        }
        getChatMember($, v, U) {
            return this.raw.getChatMember({ chat_id: $, user_id: v }, U);
        }
        setChatStickerSet($, v, U) {
            return this.raw.setChatStickerSet(
                { chat_id: $, sticker_set_name: v },
                U,
            );
        }
        deleteChatStickerSet($, v) {
            return this.raw.deleteChatStickerSet({ chat_id: $ }, v);
        }
        getForumTopicIconStickers($) {
            return this.raw.getForumTopicIconStickers($);
        }
        createForumTopic($, v, U, N) {
            return this.raw.createForumTopic({ chat_id: $, name: v, ...U }, N);
        }
        editForumTopic($, v, U, N) {
            return this.raw.editForumTopic(
                { chat_id: $, message_thread_id: v, ...U },
                N,
            );
        }
        closeForumTopic($, v, U) {
            return this.raw.closeForumTopic(
                { chat_id: $, message_thread_id: v },
                U,
            );
        }
        reopenForumTopic($, v, U) {
            return this.raw.reopenForumTopic(
                { chat_id: $, message_thread_id: v },
                U,
            );
        }
        deleteForumTopic($, v, U) {
            return this.raw.deleteForumTopic(
                { chat_id: $, message_thread_id: v },
                U,
            );
        }
        unpinAllForumTopicMessages($, v, U) {
            return this.raw.unpinAllForumTopicMessages(
                { chat_id: $, message_thread_id: v },
                U,
            );
        }
        editGeneralForumTopic($, v, U) {
            return this.raw.editGeneralForumTopic({ chat_id: $, name: v }, U);
        }
        closeGeneralForumTopic($, v) {
            return this.raw.closeGeneralForumTopic({ chat_id: $ }, v);
        }
        reopenGeneralForumTopic($, v) {
            return this.raw.reopenGeneralForumTopic({ chat_id: $ }, v);
        }
        hideGeneralForumTopic($, v) {
            return this.raw.hideGeneralForumTopic({ chat_id: $ }, v);
        }
        unhideGeneralForumTopic($, v) {
            return this.raw.unhideGeneralForumTopic({ chat_id: $ }, v);
        }
        unpinAllGeneralForumTopicMessages($, v) {
            return this.raw.unpinAllGeneralForumTopicMessages(
                { chat_id: $ },
                v,
            );
        }
        answerCallbackQuery($, v, U) {
            return this.raw.answerCallbackQuery(
                { callback_query_id: $, ...v },
                U,
            );
        }
        setMyName($, v, U) {
            return this.raw.setMyName({ name: $, ...v }, U);
        }
        getMyName($, v) {
            return this.raw.getMyName($ !== null && $ !== void 0 ? $ : {}, v);
        }
        setMyCommands($, v, U) {
            return this.raw.setMyCommands({ commands: $, ...v }, U);
        }
        deleteMyCommands($, v) {
            return this.raw.deleteMyCommands({ ...$ }, v);
        }
        getMyCommands($, v) {
            return this.raw.getMyCommands({ ...$ }, v);
        }
        setMyDescription($, v, U) {
            return this.raw.setMyDescription({ description: $, ...v }, U);
        }
        getMyDescription($, v) {
            return this.raw.getMyDescription({ ...$ }, v);
        }
        setMyShortDescription($, v, U) {
            return this.raw.setMyShortDescription(
                { short_description: $, ...v },
                U,
            );
        }
        getMyShortDescription($, v) {
            return this.raw.getMyShortDescription({ ...$ }, v);
        }
        setChatMenuButton($, v) {
            return this.raw.setChatMenuButton({ ...$ }, v);
        }
        getChatMenuButton($, v) {
            return this.raw.getChatMenuButton({ ...$ }, v);
        }
        setMyDefaultAdministratorRights($, v) {
            return this.raw.setMyDefaultAdministratorRights({ ...$ }, v);
        }
        getMyDefaultAdministratorRights($, v) {
            return this.raw.getMyDefaultAdministratorRights({ ...$ }, v);
        }
        getMyStarBalance($) {
            return this.raw.getMyStarBalance($);
        }
        editMessageText($, v, U, N, I) {
            return this.raw.editMessageText(
                { chat_id: $, message_id: v, text: U, ...N },
                I,
            );
        }
        editMessageTextInline($, v, U, N) {
            return this.raw.editMessageText(
                { inline_message_id: $, text: v, ...U },
                N,
            );
        }
        editMessageCaption($, v, U, N) {
            return this.raw.editMessageCaption(
                { chat_id: $, message_id: v, ...U },
                N,
            );
        }
        editMessageCaptionInline($, v, U) {
            return this.raw.editMessageCaption(
                { inline_message_id: $, ...v },
                U,
            );
        }
        editMessageMedia($, v, U, N, I) {
            return this.raw.editMessageMedia(
                { chat_id: $, message_id: v, media: U, ...N },
                I,
            );
        }
        editMessageMediaInline($, v, U, N) {
            return this.raw.editMessageMedia(
                { inline_message_id: $, media: v, ...U },
                N,
            );
        }
        editMessageReplyMarkup($, v, U, N) {
            return this.raw.editMessageReplyMarkup(
                { chat_id: $, message_id: v, ...U },
                N,
            );
        }
        editMessageReplyMarkupInline($, v, U) {
            return this.raw.editMessageReplyMarkup(
                { inline_message_id: $, ...v },
                U,
            );
        }
        stopPoll($, v, U, N) {
            return this.raw.stopPoll({ chat_id: $, message_id: v, ...U }, N);
        }
        deleteMessage($, v, U) {
            return this.raw.deleteMessage({ chat_id: $, message_id: v }, U);
        }
        deleteMessages($, v, U) {
            return this.raw.deleteMessages({ chat_id: $, message_ids: v }, U);
        }
        deleteBusinessMessages($, v, U) {
            return this.raw.deleteBusinessMessages(
                { business_connection_id: $, message_ids: v },
                U,
            );
        }
        setBusinessAccountName($, v, U, N) {
            return this.raw.setBusinessAccountName(
                { business_connection_id: $, first_name: v, ...U },
                N,
            );
        }
        setBusinessAccountUsername($, v, U) {
            return this.raw.setBusinessAccountUsername(
                { business_connection_id: $, username: v },
                U,
            );
        }
        setBusinessAccountBio($, v, U) {
            return this.raw.setBusinessAccountBio(
                { business_connection_id: $, bio: v },
                U,
            );
        }
        setBusinessAccountProfilePhoto($, v, U, N) {
            return this.raw.setBusinessAccountProfilePhoto(
                { business_connection_id: $, photo: v, ...U },
                N,
            );
        }
        removeBusinessAccountProfilePhoto($, v, U) {
            return this.raw.removeBusinessAccountProfilePhoto(
                { business_connection_id: $, ...v },
                U,
            );
        }
        setBusinessAccountGiftSettings($, v, U, N) {
            return this.raw.setBusinessAccountGiftSettings(
                {
                    business_connection_id: $,
                    show_gift_button: v,
                    accepted_gift_types: U,
                },
                N,
            );
        }
        getBusinessAccountStarBalance($, v) {
            return this.raw.getBusinessAccountStarBalance(
                { business_connection_id: $ },
                v,
            );
        }
        transferBusinessAccountStars($, v, U) {
            return this.raw.transferBusinessAccountStars(
                { business_connection_id: $, star_count: v },
                U,
            );
        }
        getBusinessAccountGifts($, v, U) {
            return this.raw.getBusinessAccountGifts(
                { business_connection_id: $, ...v },
                U,
            );
        }
        convertGiftToStars($, v, U) {
            return this.raw.convertGiftToStars(
                { business_connection_id: $, owned_gift_id: v },
                U,
            );
        }
        upgradeGift($, v, U, N) {
            return this.raw.upgradeGift(
                { business_connection_id: $, owned_gift_id: v, ...U },
                N,
            );
        }
        transferGift($, v, U, N, I) {
            return this.raw.transferGift(
                {
                    business_connection_id: $,
                    owned_gift_id: v,
                    new_owner_chat_id: U,
                    star_count: N,
                },
                I,
            );
        }
        postStory($, v, U, N, I) {
            return this.raw.postStory(
                {
                    business_connection_id: $,
                    content: v,
                    active_period: U,
                    ...N,
                },
                I,
            );
        }
        editStory($, v, U, N, I) {
            return this.raw.editStory(
                { business_connection_id: $, story_id: v, content: U, ...N },
                I,
            );
        }
        deleteStory($, v, U) {
            return this.raw.deleteStory(
                { business_connection_id: $, story_id: v },
                U,
            );
        }
        sendSticker($, v, U, N) {
            return this.raw.sendSticker({ chat_id: $, sticker: v, ...U }, N);
        }
        getStickerSet($, v) {
            return this.raw.getStickerSet({ name: $ }, v);
        }
        getCustomEmojiStickers($, v) {
            return this.raw.getCustomEmojiStickers({ custom_emoji_ids: $ }, v);
        }
        uploadStickerFile($, v, U, N) {
            return this.raw.uploadStickerFile(
                { user_id: $, sticker_format: v, sticker: U },
                N,
            );
        }
        createNewStickerSet($, v, U, N, I, P) {
            return this.raw.createNewStickerSet(
                { user_id: $, name: v, title: U, stickers: N, ...I },
                P,
            );
        }
        addStickerToSet($, v, U, N) {
            return this.raw.addStickerToSet(
                { user_id: $, name: v, sticker: U },
                N,
            );
        }
        setStickerPositionInSet($, v, U) {
            return this.raw.setStickerPositionInSet(
                { sticker: $, position: v },
                U,
            );
        }
        deleteStickerFromSet($, v) {
            return this.raw.deleteStickerFromSet({ sticker: $ }, v);
        }
        replaceStickerInSet($, v, U, N, I) {
            return this.raw.replaceStickerInSet(
                { user_id: $, name: v, old_sticker: U, sticker: N },
                I,
            );
        }
        setStickerEmojiList($, v, U) {
            return this.raw.setStickerEmojiList(
                { sticker: $, emoji_list: v },
                U,
            );
        }
        setStickerKeywords($, v, U) {
            return this.raw.setStickerKeywords({ sticker: $, keywords: v }, U);
        }
        setStickerMaskPosition($, v, U) {
            return this.raw.setStickerMaskPosition(
                { sticker: $, mask_position: v },
                U,
            );
        }
        setStickerSetTitle($, v, U) {
            return this.raw.setStickerSetTitle({ name: $, title: v }, U);
        }
        deleteStickerSet($, v) {
            return this.raw.deleteStickerSet({ name: $ }, v);
        }
        setStickerSetThumbnail($, v, U, N, I) {
            return this.raw.setStickerSetThumbnail(
                { name: $, user_id: v, thumbnail: U, format: N },
                I,
            );
        }
        setCustomEmojiStickerSetThumbnail($, v, U) {
            return this.raw.setCustomEmojiStickerSetThumbnail(
                { name: $, custom_emoji_id: v },
                U,
            );
        }
        getAvailableGifts($) {
            return this.raw.getAvailableGifts($);
        }
        sendGift($, v, U, N) {
            return this.raw.sendGift({ user_id: $, gift_id: v, ...U }, N);
        }
        giftPremiumSubscription($, v, U, N, I) {
            return this.raw.giftPremiumSubscription(
                { user_id: $, month_count: v, star_count: U, ...N },
                I,
            );
        }
        sendGiftToChannel($, v, U, N) {
            return this.raw.sendGift({ chat_id: $, gift_id: v, ...U }, N);
        }
        answerInlineQuery($, v, U, N) {
            return this.raw.answerInlineQuery(
                { inline_query_id: $, results: v, ...U },
                N,
            );
        }
        answerWebAppQuery($, v, U) {
            return this.raw.answerWebAppQuery(
                { web_app_query_id: $, result: v },
                U,
            );
        }
        savePreparedInlineMessage($, v, U, N) {
            return this.raw.savePreparedInlineMessage(
                { user_id: $, result: v, ...U },
                N,
            );
        }
        sendInvoice($, v, U, N, I, P, S, O) {
            return this.raw.sendInvoice(
                {
                    chat_id: $,
                    title: v,
                    description: U,
                    payload: N,
                    currency: I,
                    prices: P,
                    ...S,
                },
                O,
            );
        }
        createInvoiceLink($, v, U, N, I, P, S, O) {
            return this.raw.createInvoiceLink(
                {
                    title: $,
                    description: v,
                    payload: U,
                    provider_token: N,
                    currency: I,
                    prices: P,
                    ...S,
                },
                O,
            );
        }
        answerShippingQuery($, v, U, N) {
            return this.raw.answerShippingQuery(
                { shipping_query_id: $, ok: v, ...U },
                N,
            );
        }
        answerPreCheckoutQuery($, v, U, N) {
            return this.raw.answerPreCheckoutQuery(
                { pre_checkout_query_id: $, ok: v, ...U },
                N,
            );
        }
        getStarTransactions($, v) {
            return this.raw.getStarTransactions({ ...$ }, v);
        }
        refundStarPayment($, v, U) {
            return this.raw.refundStarPayment(
                { user_id: $, telegram_payment_charge_id: v },
                U,
            );
        }
        editUserStarSubscription($, v, U, N) {
            return this.raw.editUserStarSubscription(
                { user_id: $, telegram_payment_charge_id: v, is_canceled: U },
                N,
            );
        }
        verifyUser($, v, U) {
            return this.raw.verifyUser({ user_id: $, ...v }, U);
        }
        verifyChat($, v, U) {
            return this.raw.verifyChat({ chat_id: $, ...v }, U);
        }
        removeUserVerification($, v) {
            return this.raw.removeUserVerification({ user_id: $ }, v);
        }
        removeChatVerification($, v) {
            return this.raw.removeChatVerification({ chat_id: $ }, v);
        }
        readBusinessMessage($, v, U, N) {
            return this.raw.readBusinessMessage(
                { business_connection_id: $, chat_id: v, message_id: U },
                N,
            );
        }
        setPassportDataErrors($, v, U) {
            return this.raw.setPassportDataErrors({ user_id: $, errors: v }, U);
        }
        sendGame($, v, U, N) {
            return this.raw.sendGame(
                { chat_id: $, game_short_name: v, ...U },
                N,
            );
        }
        setGameScore($, v, U, N, I, P) {
            return this.raw.setGameScore(
                { chat_id: $, message_id: v, user_id: U, score: N, ...I },
                P,
            );
        }
        setGameScoreInline($, v, U, N, I) {
            return this.raw.setGameScore(
                { inline_message_id: $, user_id: v, score: U, ...N },
                I,
            );
        }
        getGameHighScores($, v, U, N) {
            return this.raw.getGameHighScores(
                { chat_id: $, message_id: v, user_id: U },
                N,
            );
        }
        getGameHighScoresInline($, v, U) {
            return this.raw.getGameHighScores(
                { inline_message_id: $, user_id: v },
                U,
            );
        }
    }
    kz.Api = qz;
});
var PS = k((NS) => {
    Object.defineProperty(NS, '__esModule', { value: !0 });
    NS.Bot = NS.BotError = NS.DEFAULT_UPDATE_TYPES = void 0;
    var gv = gP();
    Object.defineProperty(NS, 'BotError', {
        enumerable: !0,
        get: function () {
            return gv.BotError;
        },
    });
    var bL = i6(),
        Rz = $S(),
        vS = s6(),
        Cz = l6(),
        US = W$(),
        I$ = US.debug('grammy:bot'),
        uL = US.debug('grammy:warn'),
        i$ = US.debug('grammy:error');
    NS.DEFAULT_UPDATE_TYPES = [
        'message',
        'edited_message',
        'channel_post',
        'edited_channel_post',
        'business_connection',
        'business_message',
        'edited_business_message',
        'deleted_business_messages',
        'inline_query',
        'chosen_inline_result',
        'callback_query',
        'shipping_query',
        'pre_checkout_query',
        'poll',
        'poll_answer',
        'my_chat_member',
        'chat_join_request',
        'chat_boost',
        'removed_chat_boost',
    ];
    class Tz extends gv.Composer {
        constructor($, v) {
            var U;
            super();
            if (
                ((this.token = $),
                (this.pollingRunning = !1),
                (this.lastTriedUpdateId = 0),
                (this.observedUpdateTypes = new Set()),
                (this.errorHandler = async (N) => {
                    var I, P;
                    if (
                        (console.error(
                            'Error in middleware while handling update',
                            (P =
                                (I = N.ctx) === null || I === void 0
                                    ? void 0
                                    : I.update) === null || P === void 0
                                ? void 0
                                : P.update_id,
                            N.error,
                        ),
                        console.error('No error handler was set!'),
                        console.error(
                            'Set your own error handler with `bot.catch = ...`',
                        ),
                        this.pollingRunning)
                    )
                        console.error('Stopping bot'), await this.stop();
                    throw N;
                }),
                !$)
            )
                throw new Error('Empty token!');
            (this.me = v === null || v === void 0 ? void 0 : v.botInfo),
                (this.clientConfig =
                    v === null || v === void 0 ? void 0 : v.client),
                (this.ContextConstructor =
                    (U =
                        v === null || v === void 0
                            ? void 0
                            : v.ContextConstructor) !== null && U !== void 0
                        ? U
                        : bL.Context),
                (this.api = new Rz.Api($, this.clientConfig));
        }
        set botInfo($) {
            this.me = $;
        }
        get botInfo() {
            if (this.me === void 0)
                throw new Error(
                    'Bot information unavailable! Make sure to call `await bot.init()` before accessing `bot.botInfo`!',
                );
            return this.me;
        }
        on($, ...v) {
            for (let [U] of Cz.parse($).flatMap(Cz.preprocess))
                this.observedUpdateTypes.add(U);
            return super.on($, ...v);
        }
        reaction($, ...v) {
            return (
                this.observedUpdateTypes.add('message_reaction'),
                super.reaction($, ...v)
            );
        }
        isInited() {
            return this.me !== void 0;
        }
        async init($) {
            var v;
            if (!this.isInited()) {
                I$('Initializing bot'),
                    ((v = this.mePromise) !== null && v !== void 0) ||
                        (this.mePromise = rz(() => this.api.getMe($), $));
                let U;
                try {
                    U = await this.mePromise;
                } finally {
                    this.mePromise = void 0;
                }
                if (this.me === void 0) this.me = U;
                else I$('Bot info was set by now, will not overwrite');
            }
            I$(`I am ${this.me.username}!`);
        }
        async handleUpdates($) {
            for (let v of $) {
                this.lastTriedUpdateId = v.update_id;
                try {
                    await this.handleUpdate(v);
                } catch (U) {
                    if (U instanceof gv.BotError) await this.errorHandler(U);
                    else
                        throw (
                            (console.error(
                                'FATAL: grammY unable to handle:',
                                U,
                            ),
                            U)
                        );
                }
            }
        }
        async handleUpdate($, v) {
            if (this.me === void 0)
                throw new Error(
                    'Bot not initialized! Either call `await bot.init()`, or directly set the `botInfo` option in the `Bot` constructor to specify a known bot info object.',
                );
            I$(`Processing update ${$.update_id}`);
            let U = new Rz.Api(this.token, this.clientConfig, v),
                N = this.api.config.installedTransformers();
            if (N.length > 0) U.config.use(...N);
            let I = new this.ContextConstructor($, U, this.me);
            try {
                await gv.run(this.middleware(), I);
            } catch (P) {
                throw (
                    (i$(`Error in middleware for update ${$.update_id}`),
                    new gv.BotError(P, I))
                );
            }
        }
        async start($) {
            var v, U, N;
            let I = [];
            if (!this.isInited())
                I.push(
                    this.init(
                        (v = this.pollingAbortController) === null ||
                            v === void 0
                            ? void 0
                            : v.signal,
                    ),
                );
            if (this.pollingRunning) {
                await Promise.all(I),
                    I$('Simple long polling already running!');
                return;
            }
            (this.pollingRunning = !0),
                (this.pollingAbortController = new EL.AbortController());
            try {
                I.push(
                    rz(
                        async () => {
                            var P;
                            await this.api.deleteWebhook(
                                {
                                    drop_pending_updates:
                                        $ === null || $ === void 0
                                            ? void 0
                                            : $.drop_pending_updates,
                                },
                                (P = this.pollingAbortController) === null ||
                                    P === void 0
                                    ? void 0
                                    : P.signal,
                            );
                        },
                        (U = this.pollingAbortController) === null ||
                            U === void 0
                            ? void 0
                            : U.signal,
                    ),
                ),
                    await Promise.all(I),
                    await ((N =
                        $ === null || $ === void 0 ? void 0 : $.onStart) ===
                        null || N === void 0
                        ? void 0
                        : N.call($, this.botInfo));
            } catch (P) {
                throw (
                    ((this.pollingRunning = !1),
                    (this.pollingAbortController = void 0),
                    P)
                );
            }
            if (!this.pollingRunning) return;
            cL(
                this.observedUpdateTypes,
                $ === null || $ === void 0 ? void 0 : $.allowed_updates,
            ),
                (this.use = FL),
                I$('Starting simple long polling'),
                await this.loop($),
                I$('Middleware is done running');
        }
        async stop() {
            var $;
            if (this.pollingRunning) {
                I$('Stopping bot, saving update offset'),
                    (this.pollingRunning = !1),
                    ($ = this.pollingAbortController) === null ||
                        $ === void 0 ||
                        $.abort();
                let v = this.lastTriedUpdateId + 1;
                await this.api
                    .getUpdates({ offset: v, limit: 1 })
                    .finally(() => (this.pollingAbortController = void 0));
            } else I$('Bot is not running!');
        }
        isRunning() {
            return this.pollingRunning;
        }
        catch($) {
            this.errorHandler = $;
        }
        async loop($) {
            var v, U;
            let N = $ === null || $ === void 0 ? void 0 : $.limit,
                I =
                    (v = $ === null || $ === void 0 ? void 0 : $.timeout) !==
                        null && v !== void 0
                        ? v
                        : 30,
                P =
                    (U =
                        $ === null || $ === void 0
                            ? void 0
                            : $.allowed_updates) !== null && U !== void 0
                        ? U
                        : [];
            try {
                while (this.pollingRunning) {
                    let S = await this.fetchUpdates({
                        limit: N,
                        timeout: I,
                        allowed_updates: P,
                    });
                    if (S === void 0) break;
                    await this.handleUpdates(S), (P = void 0);
                }
            } finally {
                this.pollingRunning = !1;
            }
        }
        async fetchUpdates({ limit: $, timeout: v, allowed_updates: U }) {
            var N;
            let I = this.lastTriedUpdateId + 1,
                P = void 0;
            do
                try {
                    P = await this.api.getUpdates(
                        { offset: I, limit: $, timeout: v, allowed_updates: U },
                        (N = this.pollingAbortController) === null ||
                            N === void 0
                            ? void 0
                            : N.signal,
                    );
                } catch (S) {
                    await this.handlePollingError(S);
                }
            while (P === void 0 && this.pollingRunning);
            return P;
        }
        async handlePollingError($) {
            var v;
            if (!this.pollingRunning) {
                I$('Pending getUpdates request cancelled');
                return;
            }
            let U = 3;
            if ($ instanceof vS.GrammyError) {
                if (
                    (i$($.message),
                    $.error_code === 401 || $.error_code === 409)
                )
                    throw $;
                else if ($.error_code === 429)
                    i$('Bot API server is closing.'),
                        (U =
                            (v = $.parameters.retry_after) !== null &&
                            v !== void 0
                                ? v
                                : U);
            } else i$($);
            i$(`Call to getUpdates failed, retrying in ${U} seconds ...`),
                await IS(U);
        }
    }
    NS.Bot = Tz;
    async function rz($, v) {
        let N = 50;
        async function I(S) {
            let O = !1,
                J = 'rethrow';
            if (S instanceof vS.HttpError) (O = !0), (J = 'retry');
            else if (S instanceof vS.GrammyError) {
                if (S.error_code >= 500) (O = !0), (J = 'retry');
                else if (S.error_code === 429) {
                    let A = S.parameters.retry_after;
                    if (typeof A === 'number') await IS(A, v), (N = 50);
                    else O = !0;
                    J = 'retry';
                }
            }
            if (O) {
                if (N !== 50) await IS(N, v);
                N = Math.min(1200000, 2 * N);
            }
            return J;
        }
        let P = { ok: !1 };
        while (!P.ok)
            try {
                P = { ok: !0, value: await $() };
            } catch (S) {
                switch ((i$(S), await I(S))) {
                    case 'retry':
                        continue;
                    case 'rethrow':
                        throw S;
                }
            }
        return P.value;
    }
    async function IS($, v) {
        let U, N;
        function I() {
            if (
                (N === null || N === void 0 || N(new Error('Aborted delay')),
                U !== void 0)
            )
                clearTimeout(U);
        }
        try {
            await new Promise((P, S) => {
                if (
                    ((N = S), v === null || v === void 0 ? void 0 : v.aborted)
                ) {
                    I();
                    return;
                }
                v === null || v === void 0 || v.addEventListener('abort', I),
                    (U = setTimeout(P, 1000 * $));
            });
        } finally {
            v === null || v === void 0 || v.removeEventListener('abort', I);
        }
    }
    function cL($, v = NS.DEFAULT_UPDATE_TYPES) {
        let U = Array.from($).filter((N) => !v.includes(N));
        if (U.length > 0)
            uL(
                `You registered listeners for the following update types, but you did not specify them in \`allowed_updates\` so they may not be received: ${U.map((N) => `'${N}'`).join(', ')}`,
            );
    }
    function FL() {
        throw new Error(`It looks like you are registering more listeners on your bot from within other listeners! This means that every time your bot handles a message like this one, new listeners will be added. This list grows until your machine crashes, so grammY throws this error to tell you that you should probably do things a bit differently. If you're unsure how to resolve this problem, you can ask in the group chat: https://telegram.me/grammyjs

On the other hand, if you actually know what you're doing and you do need to install further middleware while your bot is running, consider installing a composer instance on your bot, and in turn augment the composer after the fact. This way, you can circumvent this protection against memory leaks.`);
    }
    var EL = sP();
});
var nz = k((gz) => {
    Object.defineProperty(gz, '__esModule', { value: !0 });
    gz.API_CONSTANTS = void 0;
    var mz = PS(),
        qL = [
            ...mz.DEFAULT_UPDATE_TYPES,
            'chat_member',
            'message_reaction',
            'message_reaction_count',
        ],
        kL = {
            is_anonymous: !0,
            can_manage_chat: !0,
            can_delete_messages: !0,
            can_manage_video_chats: !0,
            can_restrict_members: !0,
            can_promote_members: !0,
            can_change_info: !0,
            can_invite_users: !0,
            can_post_stories: !0,
            can_edit_stories: !0,
            can_delete_stories: !0,
            can_post_messages: !0,
            can_edit_messages: !0,
            can_pin_messages: !0,
            can_manage_topics: !0,
        };
    gz.API_CONSTANTS = {
        DEFAULT_UPDATE_TYPES: mz.DEFAULT_UPDATE_TYPES,
        ALL_UPDATE_TYPES: qL,
        ALL_CHAT_PERMISSIONS: kL,
    };
    Object.freeze(gz.API_CONSTANTS);
});
var _z = k((yz) => {
    Object.defineProperty(yz, '__esModule', { value: !0 });
    yz.InlineQueryResultBuilder = void 0;
    function x($) {
        return { ...$, ...OS($) };
    }
    function OS($) {
        return {
            text(v, U = {}) {
                let N = { message_text: v, ...U };
                return { ...$, input_message_content: N };
            },
            location(v, U, N = {}) {
                let I = { latitude: v, longitude: U, ...N };
                return { ...$, input_message_content: I };
            },
            venue(v, U, N, I, P) {
                let S = {
                    title: v,
                    latitude: U,
                    longitude: N,
                    address: I,
                    ...P,
                };
                return { ...$, input_message_content: S };
            },
            contact(v, U, N = {}) {
                let I = { first_name: v, phone_number: U, ...N };
                return { ...$, input_message_content: I };
            },
            invoice(v, U, N, I, P, S, O = {}) {
                let J = {
                    title: v,
                    description: U,
                    payload: N,
                    provider_token: I,
                    currency: P,
                    prices: S,
                    ...O,
                };
                return { ...$, input_message_content: J };
            },
        };
    }
    yz.InlineQueryResultBuilder = {
        article($, v, U = {}) {
            return OS({ type: 'article', id: $, title: v, ...U });
        },
        audio($, v, U, N = {}) {
            return x({
                type: 'audio',
                id: $,
                title: v,
                audio_url: typeof U === 'string' ? U : U.href,
                ...N,
            });
        },
        audioCached($, v, U = {}) {
            return x({ type: 'audio', id: $, audio_file_id: v, ...U });
        },
        contact($, v, U, N = {}) {
            return x({
                type: 'contact',
                id: $,
                phone_number: v,
                first_name: U,
                ...N,
            });
        },
        documentPdf($, v, U, N = {}) {
            return x({
                type: 'document',
                mime_type: 'application/pdf',
                id: $,
                title: v,
                document_url: typeof U === 'string' ? U : U.href,
                ...N,
            });
        },
        documentZip($, v, U, N = {}) {
            return x({
                type: 'document',
                mime_type: 'application/zip',
                id: $,
                title: v,
                document_url: typeof U === 'string' ? U : U.href,
                ...N,
            });
        },
        documentCached($, v, U, N = {}) {
            return x({
                type: 'document',
                id: $,
                title: v,
                document_file_id: U,
                ...N,
            });
        },
        game($, v, U = {}) {
            return { type: 'game', id: $, game_short_name: v, ...U };
        },
        gif($, v, U, N = {}) {
            return x({
                type: 'gif',
                id: $,
                gif_url: typeof v === 'string' ? v : v.href,
                thumbnail_url: typeof U === 'string' ? U : U.href,
                ...N,
            });
        },
        gifCached($, v, U = {}) {
            return x({ type: 'gif', id: $, gif_file_id: v, ...U });
        },
        location($, v, U, N, I = {}) {
            return x({
                type: 'location',
                id: $,
                title: v,
                latitude: U,
                longitude: N,
                ...I,
            });
        },
        mpeg4gif($, v, U, N = {}) {
            return x({
                type: 'mpeg4_gif',
                id: $,
                mpeg4_url: typeof v === 'string' ? v : v.href,
                thumbnail_url: typeof U === 'string' ? U : U.href,
                ...N,
            });
        },
        mpeg4gifCached($, v, U = {}) {
            return x({ type: 'mpeg4_gif', id: $, mpeg4_file_id: v, ...U });
        },
        photo($, v, U = { thumbnail_url: typeof v === 'string' ? v : v.href }) {
            return x({
                type: 'photo',
                id: $,
                photo_url: typeof v === 'string' ? v : v.href,
                ...U,
            });
        },
        photoCached($, v, U = {}) {
            return x({ type: 'photo', id: $, photo_file_id: v, ...U });
        },
        stickerCached($, v, U = {}) {
            return x({ type: 'sticker', id: $, sticker_file_id: v, ...U });
        },
        venue($, v, U, N, I, P = {}) {
            return x({
                type: 'venue',
                id: $,
                title: v,
                latitude: U,
                longitude: N,
                address: I,
                ...P,
            });
        },
        videoHtml($, v, U, N, I = {}) {
            return OS({
                type: 'video',
                mime_type: 'text/html',
                id: $,
                title: v,
                video_url: typeof U === 'string' ? U : U.href,
                thumbnail_url: typeof N === 'string' ? N : N.href,
                ...I,
            });
        },
        videoMp4($, v, U, N, I = {}) {
            return x({
                type: 'video',
                mime_type: 'video/mp4',
                id: $,
                title: v,
                video_url: typeof U === 'string' ? U : U.href,
                thumbnail_url: typeof N === 'string' ? N : N.href,
                ...I,
            });
        },
        videoCached($, v, U, N = {}) {
            return x({
                type: 'video',
                id: $,
                title: v,
                video_file_id: U,
                ...N,
            });
        },
        voice($, v, U, N = {}) {
            return x({
                type: 'voice',
                id: $,
                title: v,
                voice_url: typeof U === 'string' ? U : U.href,
                ...N,
            });
        },
        voiceCached($, v, U, N = {}) {
            return x({
                type: 'voice',
                id: $,
                title: v,
                voice_file_id: U,
                ...N,
            });
        },
    };
});
var pz = k((oz) => {
    Object.defineProperty(oz, '__esModule', { value: !0 });
    oz.InputMediaBuilder = void 0;
    oz.InputMediaBuilder = {
        photo($, v = {}) {
            return { type: 'photo', media: $, ...v };
        },
        video($, v = {}) {
            return { type: 'video', media: $, ...v };
        },
        animation($, v = {}) {
            return { type: 'animation', media: $, ...v };
        },
        audio($, v = {}) {
            return { type: 'audio', media: $, ...v };
        },
        document($, v = {}) {
            return { type: 'document', media: $, ...v };
        },
    };
});
var az = k((dz) => {
    Object.defineProperty(dz, '__esModule', { value: !0 });
    dz.InlineKeyboard = dz.Keyboard = void 0;
    class o {
        constructor($ = [[]]) {
            this.keyboard = $;
        }
        add(...$) {
            var v;
            return (
                (v = this.keyboard[this.keyboard.length - 1]) === null ||
                    v === void 0 ||
                    v.push(...$),
                this
            );
        }
        row(...$) {
            return this.keyboard.push($), this;
        }
        text($) {
            return this.add(o.text($));
        }
        static text($) {
            return { text: $ };
        }
        requestUsers($, v, U = {}) {
            return this.add(o.requestUsers($, v, U));
        }
        static requestUsers($, v, U = {}) {
            return { text: $, request_users: { request_id: v, ...U } };
        }
        requestChat($, v, U = { chat_is_channel: !1 }) {
            return this.add(o.requestChat($, v, U));
        }
        static requestChat($, v, U = { chat_is_channel: !1 }) {
            return { text: $, request_chat: { request_id: v, ...U } };
        }
        requestContact($) {
            return this.add(o.requestContact($));
        }
        static requestContact($) {
            return { text: $, request_contact: !0 };
        }
        requestLocation($) {
            return this.add(o.requestLocation($));
        }
        static requestLocation($) {
            return { text: $, request_location: !0 };
        }
        requestPoll($, v) {
            return this.add(o.requestPoll($, v));
        }
        static requestPoll($, v) {
            return { text: $, request_poll: { type: v } };
        }
        webApp($, v) {
            return this.add(o.webApp($, v));
        }
        static webApp($, v) {
            return { text: $, web_app: { url: v } };
        }
        persistent($ = !0) {
            return (this.is_persistent = $), this;
        }
        selected($ = !0) {
            return (this.selective = $), this;
        }
        oneTime($ = !0) {
            return (this.one_time_keyboard = $), this;
        }
        resized($ = !0) {
            return (this.resize_keyboard = $), this;
        }
        placeholder($) {
            return (this.input_field_placeholder = $), this;
        }
        toTransposed() {
            let $ = this.keyboard,
                v = iz($);
            return this.clone(v);
        }
        toFlowed($, v = {}) {
            let U = this.keyboard,
                N = tz(U, $, v);
            return this.clone(N);
        }
        clone($ = this.keyboard) {
            let v = new o($.map((U) => U.slice()));
            return (
                (v.is_persistent = this.is_persistent),
                (v.selective = this.selective),
                (v.one_time_keyboard = this.one_time_keyboard),
                (v.resize_keyboard = this.resize_keyboard),
                (v.input_field_placeholder = this.input_field_placeholder),
                v
            );
        }
        append(...$) {
            for (let v of $) {
                let U = o.from(v);
                this.keyboard.push(...U.keyboard.map((N) => N.slice()));
            }
            return this;
        }
        build() {
            return this.keyboard;
        }
        static from($) {
            if ($ instanceof o) return $.clone();
            function v(U) {
                return typeof U === 'string' ? o.text(U) : U;
            }
            return new o($.map((U) => U.map(v)));
        }
    }
    dz.Keyboard = o;
    class g {
        constructor($ = [[]]) {
            this.inline_keyboard = $;
        }
        add(...$) {
            var v;
            return (
                (v = this.inline_keyboard[this.inline_keyboard.length - 1]) ===
                    null ||
                    v === void 0 ||
                    v.push(...$),
                this
            );
        }
        row(...$) {
            return this.inline_keyboard.push($), this;
        }
        url($, v) {
            return this.add(g.url($, v));
        }
        static url($, v) {
            return { text: $, url: v };
        }
        text($, v = $) {
            return this.add(g.text($, v));
        }
        static text($, v = $) {
            return { text: $, callback_data: v };
        }
        webApp($, v) {
            return this.add(g.webApp($, v));
        }
        static webApp($, v) {
            return { text: $, web_app: typeof v === 'string' ? { url: v } : v };
        }
        login($, v) {
            return this.add(g.login($, v));
        }
        static login($, v) {
            return {
                text: $,
                login_url: typeof v === 'string' ? { url: v } : v,
            };
        }
        switchInline($, v = '') {
            return this.add(g.switchInline($, v));
        }
        static switchInline($, v = '') {
            return { text: $, switch_inline_query: v };
        }
        switchInlineCurrent($, v = '') {
            return this.add(g.switchInlineCurrent($, v));
        }
        static switchInlineCurrent($, v = '') {
            return { text: $, switch_inline_query_current_chat: v };
        }
        switchInlineChosen($, v = {}) {
            return this.add(g.switchInlineChosen($, v));
        }
        static switchInlineChosen($, v = {}) {
            return { text: $, switch_inline_query_chosen_chat: v };
        }
        copyText($, v) {
            return this.add(g.copyText($, v));
        }
        static copyText($, v) {
            return {
                text: $,
                copy_text: typeof v === 'string' ? { text: v } : v,
            };
        }
        game($) {
            return this.add(g.game($));
        }
        static game($) {
            return { text: $, callback_game: {} };
        }
        pay($) {
            return this.add(g.pay($));
        }
        static pay($) {
            return { text: $, pay: !0 };
        }
        toTransposed() {
            let $ = this.inline_keyboard,
                v = iz($);
            return new g(v);
        }
        toFlowed($, v = {}) {
            let U = this.inline_keyboard,
                N = tz(U, $, v);
            return new g(N);
        }
        clone() {
            return new g(this.inline_keyboard.map(($) => $.slice()));
        }
        append(...$) {
            for (let v of $) {
                let U = g.from(v);
                this.inline_keyboard.push(
                    ...U.inline_keyboard.map((N) => N.slice()),
                );
            }
            return this;
        }
        static from($) {
            if ($ instanceof g) return $.clone();
            return new g($.map((v) => v.slice()));
        }
    }
    dz.InlineKeyboard = g;
    function iz($) {
        var v;
        let U = [];
        for (let N = 0; N < $.length; N++) {
            let I = $[N];
            for (let P = 0; P < I.length; P++) {
                let S = I[P];
                ((v = U[P]) !== null && v !== void 0 ? v : (U[P] = [])).push(S);
            }
        }
        return U;
    }
    function tz($, v, { fillLastRow: U = !1 }) {
        var N;
        let I = v;
        if (U) I = $.map((O) => O.length).reduce((O, J) => O + J, 0) % v;
        let P = [];
        for (let S of $)
            for (let O of S) {
                let J = Math.max(0, P.length - 1),
                    A = J === 0 ? I : v,
                    D = (N = P[J]) !== null && N !== void 0 ? N : (P[J] = []);
                if (D.length === A) (D = []), P.push(D);
                D.push(O);
            }
        return P;
    }
});
var N1 = k((I1) => {
    Object.defineProperty(I1, '__esModule', { value: !0 });
    I1.MemorySessionStorage = void 0;
    I1.session = rL;
    I1.lazySession = fL;
    I1.enhanceStorage = gL;
    var RL = W$(),
        CL = RL.debug('grammy:session');
    function rL($ = {}) {
        return $.type === 'multi' ? xL($) : TL($);
    }
    function TL($) {
        let { initial: v, storage: U, getSessionKey: N, custom: I } = zS($);
        return async (P, S) => {
            let O = new U4(U, P, 'session', v),
                J = await N(P);
            await O.init(J, { custom: I, lazy: !1 }),
                await S(),
                await O.finish();
        };
    }
    function xL($) {
        let v = Object.keys($).filter((N) => N !== 'type'),
            U = Object.fromEntries(v.map((N) => [N, zS($[N])]));
        return async (N, I) => {
            N.session = {};
            let P = await Promise.all(
                v.map(async (S) => {
                    let {
                            initial: O,
                            storage: J,
                            getSessionKey: A,
                            custom: D,
                        } = U[S],
                        G = new U4(J, N.session, S, O),
                        W = await A(N);
                    return await G.init(W, { custom: D, lazy: !1 }), G;
                }),
            );
            if ((await I(), N.session == null)) P.forEach((S) => S.delete());
            await Promise.all(P.map((S) => S.finish()));
        };
    }
    function fL($ = {}) {
        if ($.type !== void 0 && $.type !== 'single')
            throw new Error('Cannot use lazy multi sessions!');
        let { initial: v, storage: U, getSessionKey: N, custom: I } = zS($);
        return async (P, S) => {
            let O = new U4(U, P, 'session', v),
                J = await N(P);
            await O.init(J, { custom: I, lazy: !0 }),
                await S(),
                await O.finish();
        };
    }
    class U4 {
        constructor($, v, U, N) {
            (this.storage = $),
                (this.obj = v),
                (this.prop = U),
                (this.initial = N),
                (this.fetching = !1),
                (this.read = !1),
                (this.wrote = !1);
        }
        load() {
            if (this.key === void 0) return;
            if (this.wrote) return;
            if (this.promise === void 0)
                (this.fetching = !0),
                    (this.promise = Promise.resolve(
                        this.storage.read(this.key),
                    ).then(($) => {
                        var v;
                        if (((this.fetching = !1), this.wrote))
                            return this.value;
                        if ($ !== void 0) return (this.value = $), $;
                        if (
                            (($ =
                                (v = this.initial) === null || v === void 0
                                    ? void 0
                                    : v.call(this)),
                            $ !== void 0)
                        )
                            (this.wrote = !0), (this.value = $);
                        return $;
                    }));
            return this.promise;
        }
        async init($, v) {
            if (((this.key = $), !v.lazy)) await this.load();
            Object.defineProperty(this.obj, this.prop, {
                enumerable: !0,
                get: () => {
                    if ($ === void 0) {
                        let U = $1('access', v);
                        throw new Error(U);
                    }
                    if (((this.read = !0), !v.lazy || this.wrote))
                        return this.value;
                    return (
                        this.load(), this.fetching ? this.promise : this.value
                    );
                },
                set: (U) => {
                    if ($ === void 0) {
                        let N = $1('assign', v);
                        throw new Error(N);
                    }
                    (this.wrote = !0), (this.fetching = !1), (this.value = U);
                },
            });
        }
        delete() {
            Object.assign(this.obj, { [this.prop]: void 0 });
        }
        async finish() {
            if (this.key !== void 0) {
                if (this.read) await this.load();
                if (this.read || this.wrote) {
                    let $ = await this.value;
                    if ($ == null) await this.storage.delete(this.key);
                    else await this.storage.write(this.key, $);
                }
            }
        }
    }
    function zS($ = {}) {
        let {
            prefix: v = '',
            getSessionKey: U = sz,
            initial: N,
            storage: I,
        } = $;
        if (I == null)
            CL(
                'Storing session data in memory, all data will be lost when the bot restarts.',
            ),
                (I = new DS());
        return {
            initial: N,
            storage: I,
            getSessionKey: async (S) => {
                let O = await U(S);
                return O === void 0 ? void 0 : v + O;
            },
            custom: U !== sz,
        };
    }
    function sz($) {
        var v;
        return (v = $.chatId) === null || v === void 0 ? void 0 : v.toString();
    }
    function $1($, v) {
        let { lazy: U = !1, custom: N } = v;
        return `Cannot ${$} ${U ? 'lazy ' : ''}session data because ${N ? 'the custom `getSessionKey` function returned undefined for this update' : 'this update does not belong to a chat, so the session key is undefined'}!`;
    }
    function mL($) {
        return (
            $ === void 0 || (typeof $ === 'object' && $ !== null && '__d' in $)
        );
    }
    function gL($) {
        let { storage: v, millisecondsToLive: U, migrations: N } = $;
        if (((v = nL(v)), U !== void 0)) v = yL(v, U);
        if (N !== void 0) v = hL(v, N);
        return _L(v);
    }
    function nL($) {
        return {
            read: async (v) => {
                let U = await $.read(v);
                return mL(U) ? U : { __d: U };
            },
            write: (v, U) => $.write(v, U),
            delete: (v) => $.delete(v),
        };
    }
    function yL($, v) {
        let U = {
            read: async (N) => {
                let I = await $.read(N);
                if (I === void 0) return;
                if (I.e === void 0) return await U.write(N, I), I;
                if (I.e < Date.now()) {
                    await U.delete(N);
                    return;
                }
                return I;
            },
            write: async (N, I) => {
                (I.e = v1(I, v).expires), await $.write(N, I);
            },
            delete: (N) => $.delete(N),
        };
        return U;
    }
    function hL($, v) {
        let U = Object.keys(v)
                .map((A) => parseInt(A))
                .sort((A, D) => A - D),
            N = U.length;
        if (N === 0) throw new Error('No migrations given!');
        let I = U[0],
            P = N - 1,
            S = U[P],
            O = new Map();
        U.forEach((A, D) => O.set(A, D));
        function J(A) {
            let D = P;
            while (A <= U[D]) D--;
            return D;
        }
        return {
            read: async (A) => {
                var D;
                let G = await $.read(A);
                if (G === void 0) return G;
                let { __d: W, v: z = I - 1 } = G,
                    B =
                        1 +
                        ((D = O.get(z)) !== null && D !== void 0 ? D : J(z));
                for (; B < N; B++) W = v[U[B]](W);
                return { ...G, v: S, __d: W };
            },
            write: (A, D) => $.write(A, { v: S, ...D }),
            delete: (A) => $.delete(A),
        };
    }
    function _L($) {
        return {
            read: (v) =>
                Promise.resolve($.read(v)).then((U) =>
                    U === null || U === void 0 ? void 0 : U.__d,
                ),
            write: (v, U) => $.write(v, { __d: U }),
            delete: (v) => $.delete(v),
        };
    }
    class DS {
        constructor($) {
            (this.timeToLive = $), (this.storage = new Map());
        }
        read($) {
            let v = this.storage.get($);
            if (v === void 0) return;
            if (v.expires !== void 0 && v.expires < Date.now()) {
                this.delete($);
                return;
            }
            return v.session;
        }
        readAll() {
            return this.readAllValues();
        }
        readAllKeys() {
            return Array.from(this.storage.keys());
        }
        readAllValues() {
            return Array.from(this.storage.keys())
                .map(($) => this.read($))
                .filter(($) => $ !== void 0);
        }
        readAllEntries() {
            return Array.from(this.storage.keys())
                .map(($) => [$, this.read($)])
                .filter(($) => $[1] !== void 0);
        }
        has($) {
            return this.storage.has($);
        }
        write($, v) {
            this.storage.set($, v1(v, this.timeToLive));
        }
        delete($) {
            this.storage.delete($);
        }
    }
    I1.MemorySessionStorage = DS;
    function v1($, v) {
        if (v !== void 0 && v < 1 / 0) {
            let U = Date.now();
            return { session: $, expires: U + v };
        } else return { session: $ };
    }
});
var z1 = k((S1) => {
    Object.defineProperty(S1, '__esModule', { value: !0 });
    S1.adapters = void 0;
    var n = 'X-Telegram-Bot-Api-Secret-Token',
        N4 = n.toLowerCase(),
        L$ = 'secret token is wrong',
        t$ = () => new Response(null, { status: 200 }),
        d$ = ($) =>
            new Response($, {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }),
        e$ = () =>
            new Response('"unauthorized"', { status: 401, statusText: L$ }),
        iL = ($, v, U) => {
            var N;
            return {
                update: JSON.parse(
                    (N = $.body) !== null && N !== void 0 ? N : '{}',
                ),
                header: $.headers[n],
                end: () => U(null, { statusCode: 200 }),
                respond: (I) =>
                    U(null, {
                        statusCode: 200,
                        headers: { 'Content-Type': 'application/json' },
                        body: I,
                    }),
                unauthorized: () => U(null, { statusCode: 401 }),
            };
        },
        tL = ($, v) => {
            var U;
            let N;
            return {
                update: JSON.parse(
                    (U = $.body) !== null && U !== void 0 ? U : '{}',
                ),
                header: $.headers[n],
                end: () => N({ statusCode: 200 }),
                respond: (I) =>
                    N({
                        statusCode: 200,
                        headers: { 'Content-Type': 'application/json' },
                        body: I,
                    }),
                unauthorized: () => N({ statusCode: 401 }),
                handlerReturn: new Promise((I) => {
                    N = I;
                }),
            };
        },
        dL = ($, v) => {
            var U, N;
            return {
                update: Promise.resolve(v.body),
                header:
                    (N =
                        (U = $.res) === null || U === void 0
                            ? void 0
                            : U.headers) === null || N === void 0
                        ? void 0
                        : N[n],
                end: () => ($.res = { status: 200, body: '' }),
                respond: (I) => {
                    var P, S, O, J;
                    (S =
                        (P = $.res) === null || P === void 0
                            ? void 0
                            : P.set) === null ||
                        S === void 0 ||
                        S.call(P, 'Content-Type', 'application/json'),
                        (J =
                            (O = $.res) === null || O === void 0
                                ? void 0
                                : O.send) === null ||
                            J === void 0 ||
                            J.call(O, I);
                },
                unauthorized: () => {
                    var I, P;
                    (P =
                        (I = $.res) === null || I === void 0
                            ? void 0
                            : I.send) === null ||
                        P === void 0 ||
                        P.call(I, 401, L$);
                },
            };
        },
        eL = ($) => {
            let v;
            return {
                update: Promise.resolve($.json()),
                header: $.headers.get(n) || void 0,
                end: () => v({ status: 204 }),
                respond: (U) => v({ jsonBody: U }),
                unauthorized: () => v({ status: 401, body: L$ }),
                handlerReturn: new Promise((U) => {
                    v = U;
                }),
            };
        },
        aL = ($) => {
            let v;
            return {
                update: $.json(),
                header: $.headers.get(n) || void 0,
                end: () => {
                    v(t$());
                },
                respond: (U) => {
                    v(d$(U));
                },
                unauthorized: () => {
                    v(e$());
                },
                handlerReturn: new Promise((U) => {
                    v = U;
                }),
            };
        },
        sL = ($) => {
            let v;
            return (
                $.respondWith(
                    new Promise((U) => {
                        v = U;
                    }),
                ),
                {
                    update: $.request.json(),
                    header: $.request.headers.get(n) || void 0,
                    end: () => {
                        v(t$());
                    },
                    respond: (U) => {
                        v(d$(U));
                    },
                    unauthorized: () => {
                        v(e$());
                    },
                }
            );
        },
        $V = ($) => {
            let v;
            return {
                update: $.json(),
                header: $.headers.get(n) || void 0,
                end: () => {
                    v(t$());
                },
                respond: (U) => {
                    v(d$(U));
                },
                unauthorized: () => {
                    v(e$());
                },
                handlerReturn: new Promise((U) => {
                    v = U;
                }),
            };
        },
        vV = ($, v) => ({
            update: Promise.resolve($.body),
            header: $.header(n),
            end: () => v.end(),
            respond: (U) => {
                v.set('Content-Type', 'application/json'), v.send(U);
            },
            unauthorized: () => {
                v.status(401).send(L$);
            },
        }),
        IV = ($, v) => ({
            update: Promise.resolve($.body),
            header: $.headers[N4],
            end: () => v.status(200).send(),
            respond: (U) =>
                v.headers({ 'Content-Type': 'application/json' }).send(U),
            unauthorized: () => v.code(401).send(L$),
        }),
        UV = ($) => {
            let v;
            return {
                update: $.req.json(),
                header: $.req.header(n),
                end: () => {
                    v($.body(''));
                },
                respond: (U) => {
                    v($.json(U));
                },
                unauthorized: () => {
                    $.status(401), v($.body(''));
                },
                handlerReturn: new Promise((U) => {
                    v = U;
                }),
            };
        },
        P1 = ($, v) => {
            let U = $.headers[N4];
            return {
                update: new Promise((N, I) => {
                    let P = [];
                    $.on('data', (S) => P.push(S))
                        .once('end', () => {
                            let S = Buffer.concat(P).toString('utf-8');
                            N(JSON.parse(S));
                        })
                        .once('error', I);
                }),
                header: Array.isArray(U) ? U[0] : U,
                end: () => v.end(),
                respond: (N) =>
                    v
                        .writeHead(200, { 'Content-Type': 'application/json' })
                        .end(N),
                unauthorized: () => v.writeHead(401).end(L$),
            };
        },
        NV = ($) => ({
            update: Promise.resolve($.request.body),
            header: $.get(n) || void 0,
            end: () => {
                $.body = '';
            },
            respond: (v) => {
                $.set('Content-Type', 'application/json'),
                    ($.response.body = v);
            },
            unauthorized: () => {
                $.status = 401;
            },
        }),
        PV = ($, v) => ({
            update: Promise.resolve($.body),
            header: $.headers[N4],
            end: () => v.end(),
            respond: (U) => v.status(200).json(U),
            unauthorized: () => v.status(401).send(L$),
        }),
        SV = ($) => ({
            update: Promise.resolve($.body),
            header: $.headers.get(n) || void 0,
            end: () => $.response.sendStatus(200),
            respond: (v) => $.response.status(200).send(v),
            unauthorized: () => $.response.status(401).send(L$),
        }),
        OV = ($) => ({
            update: $.request.body.json(),
            header: $.request.headers.get(n) || void 0,
            end: () => {
                $.response.status = 200;
            },
            respond: (v) => {
                ($.response.type = 'json'), ($.response.body = v);
            },
            unauthorized: () => {
                $.response.status = 401;
            },
        }),
        zV = ($) => ({
            update: $.request.json(),
            header: $.request.headers.get(n) || void 0,
            end: () => $.respondWith(t$()),
            respond: (v) => $.respondWith(d$(v)),
            unauthorized: () => $.respondWith(e$()),
        }),
        DV = ($) => {
            let v;
            return {
                update: $.json(),
                header: $.headers.get(n) || void 0,
                end: () => {
                    if (v) v(t$());
                },
                respond: (U) => {
                    if (v) v(d$(U));
                },
                unauthorized: () => {
                    if (v) v(e$());
                },
                handlerReturn: new Promise((U) => {
                    v = U;
                }),
            };
        },
        JV = ({ request: $ }) => {
            let v;
            return {
                update: Promise.resolve($.json()),
                header: $.headers.get(n) || void 0,
                end: () => {
                    if (v) v(t$());
                },
                respond: (U) => {
                    if (v) v(d$(U));
                },
                unauthorized: () => {
                    if (v) v(e$());
                },
                handlerReturn: new Promise((U) => {
                    v = U;
                }),
            };
        },
        AV = ($, v) => {
            var U;
            return {
                update: Promise.resolve($.json()),
                header:
                    (U = $.headers.get(n)) !== null && U !== void 0
                        ? U
                        : void 0,
                end: () => v.end(null),
                respond: (N) => v.send(200, N),
                unauthorized: () => v.send(401, L$),
            };
        },
        LV = ($) => {
            let v,
                U = new Promise((N) => (v = N));
            return {
                update: Promise.resolve($.body),
                header: $.headers[N4],
                end() {
                    v('');
                },
                respond(N) {
                    ($.set.headers['content-type'] = 'application/json'), v(N);
                },
                unauthorized() {
                    ($.set.status = 401), v('');
                },
                handlerReturn: U,
            };
        };
    S1.adapters = {
        'aws-lambda': iL,
        'aws-lambda-async': tL,
        azure: dL,
        'azure-v4': eL,
        bun: aL,
        cloudflare: sL,
        'cloudflare-mod': $V,
        elysia: LV,
        express: vV,
        fastify: IV,
        hono: UV,
        http: P1,
        https: P1,
        koa: NV,
        'next-js': PV,
        nhttp: SV,
        oak: OV,
        serveHttp: zV,
        'std/http': DV,
        sveltekit: JV,
        worktop: AV,
    };
});
var L1 = k((A1) => {
    Object.defineProperty(A1, '__esModule', { value: !0 });
    A1.webhookCallback = WV;
    var J1 = W$(),
        VV = z1(),
        D1 = J1.debug('grammy:error'),
        GV = ($, v, U, N = () => v('"unauthorized"')) => ({
            update: Promise.resolve($),
            respond: v,
            header: U,
            unauthorized: N,
        }),
        XV = { ...VV.adapters, callback: GV };
    function WV($, v = J1.defaultAdapter, U, N, I) {
        if ($.isRunning())
            throw new Error(
                "Bot is already running via long polling, the webhook setup won't receive any updates!",
            );
        else
            $.start = () => {
                throw new Error(
                    'You already started the bot via webhooks, calling `bot.start()` starts the bot with long polling and this will prevent your webhook setup from receiving any updates!',
                );
            };
        let {
                onTimeout: P = 'throw',
                timeoutMilliseconds: S = 1e4,
                secretToken: O,
            } = typeof U === 'object'
                ? U
                : { onTimeout: U, timeoutMilliseconds: N, secretToken: I },
            J = !1,
            A = typeof v === 'string' ? XV[v] : v;
        return async (...D) => {
            let {
                update: G,
                respond: W,
                unauthorized: z,
                end: B,
                handlerReturn: Y,
                header: j,
            } = A(...D);
            if (!J) await $.init(), (J = !0);
            if (j !== O) return await z(), console.log(Y), Y;
            let K = !1,
                b = {
                    async send(u) {
                        (K = !0), await W(u);
                    },
                };
            if (
                (await BV(
                    $.handleUpdate(await G, b),
                    typeof P === 'function' ? () => P(...D) : P,
                    S,
                ),
                !K)
            )
                B === null || B === void 0 || B();
            return Y;
        };
    }
    function BV($, v, U) {
        if (U === 1 / 0) return $;
        return new Promise((N, I) => {
            let P = setTimeout(() => {
                if ((D1(`Request timed out after ${U} ms`), v === 'throw'))
                    I(new Error(`Request timed out after ${U} ms`));
                else {
                    if (typeof v === 'function') v();
                    N();
                }
                let S = Date.now();
                $.finally(() => {
                    let O = Date.now() - S;
                    D1(`Request completed ${O} ms after timeout!`);
                });
            }, U);
            $.then(N)
                .catch(I)
                .finally(() => clearTimeout(P));
        });
    }
});
var X1 = k((q) => {
    var QV =
            (q && q.__createBinding) ||
            (Object.create
                ? function ($, v, U, N) {
                      if (N === void 0) N = U;
                      var I = Object.getOwnPropertyDescriptor(v, U);
                      if (
                          !I ||
                          ('get' in I
                              ? !v.__esModule
                              : I.writable || I.configurable)
                      )
                          I = {
                              enumerable: !0,
                              get: function () {
                                  return v[U];
                              },
                          };
                      Object.defineProperty($, N, I);
                  }
                : function ($, v, U, N) {
                      if (N === void 0) N = U;
                      $[N] = v[U];
                  }),
        a$ =
            (q && q.__exportStar) ||
            function ($, v) {
                for (var U in $)
                    if (
                        U !== 'default' &&
                        !Object.prototype.hasOwnProperty.call(v, U)
                    )
                        QV(v, $, U);
            };
    Object.defineProperty(q, '__esModule', { value: !0 });
    q.HttpError =
        q.GrammyError =
        q.Api =
        q.matchFilter =
        q.Composer =
        q.Context =
        q.InputFile =
        q.BotError =
        q.Bot =
            void 0;
    var V1 = PS();
    Object.defineProperty(q, 'Bot', {
        enumerable: !0,
        get: function () {
            return V1.Bot;
        },
    });
    Object.defineProperty(q, 'BotError', {
        enumerable: !0,
        get: function () {
            return V1.BotError;
        },
    });
    var MV = tP();
    Object.defineProperty(q, 'InputFile', {
        enumerable: !0,
        get: function () {
            return MV.InputFile;
        },
    });
    var HV = i6();
    Object.defineProperty(q, 'Context', {
        enumerable: !0,
        get: function () {
            return HV.Context;
        },
    });
    a$(nz(), q);
    a$(_z(), q);
    a$(pz(), q);
    a$(az(), q);
    a$(N1(), q);
    a$(L1(), q);
    var jV = gP();
    Object.defineProperty(q, 'Composer', {
        enumerable: !0,
        get: function () {
            return jV.Composer;
        },
    });
    var KV = l6();
    Object.defineProperty(q, 'matchFilter', {
        enumerable: !0,
        get: function () {
            return KV.matchFilter;
        },
    });
    var wV = $S();
    Object.defineProperty(q, 'Api', {
        enumerable: !0,
        get: function () {
            return wV.Api;
        },
    });
    var G1 = s6();
    Object.defineProperty(q, 'GrammyError', {
        enumerable: !0,
        get: function () {
            return G1.GrammyError;
        },
    });
    Object.defineProperty(q, 'HttpError', {
        enumerable: !0,
        get: function () {
            return G1.HttpError;
        },
    });
});
var f = {};
Y$(f, {
    xid: () => KJ,
    void: () => _J,
    uuidv7: () => WJ,
    uuidv6: () => XJ,
    uuidv4: () => GJ,
    uuid: () => VJ,
    url: () => BJ,
    uppercase: () => jv,
    unknown: () => R6,
    union: () => g6,
    undefined: () => yJ,
    ulid: () => jJ,
    uint64: () => gJ,
    uint32: () => xJ,
    tuple: () => eJ,
    trim: () => Fv,
    treeifyError: () => Y4,
    transform: () => cP,
    toUpperCase: () => qv,
    toLowerCase: () => Ev,
    toJSONSchema: () => pN,
    templateLiteral: () => SA,
    symbol: () => nJ,
    superRefine: () => FO,
    success: () => NA,
    stringbool: () => JA,
    stringFormat: () => RJ,
    string: () => IP,
    strictObject: () => iJ,
    startsWith: () => wv,
    size: () => Qv,
    setErrorMap: () => GA,
    set: () => $A,
    safeParseAsync: () => vP,
    safeParse: () => $P,
    registry: () => N6,
    regexes: () => j$,
    regex: () => Mv,
    refine: () => cO,
    record: () => UO,
    readonly: () => HO,
    property: () => fN,
    promise: () => OA,
    prettifyError: () => Q4,
    preprocess: () => LA,
    prefault: () => GO,
    positive: () => CN,
    pipe: () => T6,
    partialRecord: () => aJ,
    parseAsync: () => sN,
    parse: () => aN,
    overwrite: () => z$,
    optional: () => C6,
    object: () => pJ,
    number: () => yS,
    nullish: () => UA,
    nullable: () => r6,
    null: () => pS,
    normalize: () => cv,
    nonpositive: () => TN,
    nonoptional: () => XO,
    nonnegative: () => xN,
    never: () => x6,
    negative: () => rN,
    nativeEnum: () => vA,
    nanoid: () => QJ,
    nan: () => PA,
    multipleOf: () => b$,
    minSize: () => u$,
    minLength: () => G$,
    mime: () => uv,
    maxSize: () => g$,
    maxLength: () => n$,
    map: () => sJ,
    lte: () => d,
    lt: () => S$,
    lowercase: () => Hv,
    looseObject: () => tJ,
    locales: () => Wv,
    literal: () => zO,
    length: () => y$,
    lazy: () => wO,
    ksuid: () => wJ,
    keyof: () => lJ,
    jwt: () => ZJ,
    json: () => AA,
    iso: () => k6,
    ipv6: () => uJ,
    ipv4: () => bJ,
    intersection: () => vO,
    int64: () => mJ,
    int32: () => TJ,
    int: () => UP,
    instanceof: () => DA,
    includes: () => Kv,
    guid: () => LJ,
    gte: () => h,
    gt: () => O$,
    globalRegistry: () => $$,
    getErrorMap: () => XA,
    function: () => lN,
    formatError: () => Jv,
    float64: () => rJ,
    float32: () => CJ,
    flattenError: () => Dv,
    file: () => IA,
    enum: () => SO,
    endsWith: () => bv,
    emoji: () => YJ,
    email: () => AJ,
    e164: () => kJ,
    discriminatedUnion: () => dJ,
    date: () => oJ,
    custom: () => zA,
    cuid2: () => HJ,
    cuid: () => MJ,
    core: () => D$,
    config: () => r,
    coerce: () => ZP,
    clone: () => l,
    cidrv6: () => FJ,
    cidrv4: () => cJ,
    check: () => uO,
    catch: () => YO,
    boolean: () => hS,
    bigint: () => fJ,
    base64url: () => qJ,
    base64: () => EJ,
    array: () => KP,
    any: () => hJ,
    _default: () => LO,
    _ZodString: () => NP,
    ZodXID: () => LP,
    ZodVoid: () => eS,
    ZodUnknown: () => tS,
    ZodUnion: () => wP,
    ZodUndefined: () => oS,
    ZodUUID: () => J$,
    ZodURL: () => SP,
    ZodULID: () => AP,
    ZodType: () => c,
    ZodTuple: () => IO,
    ZodTransform: () => uP,
    ZodTemplateLiteral: () => jO,
    ZodSymbol: () => _S,
    ZodSuccess: () => WO,
    ZodStringFormat: () => R,
    ZodString: () => Rv,
    ZodSet: () => PO,
    ZodRecord: () => bP,
    ZodRealError: () => h$,
    ZodReadonly: () => MO,
    ZodPromise: () => bO,
    ZodPrefault: () => VO,
    ZodPipe: () => qP,
    ZodOptional: () => FP,
    ZodObject: () => m6,
    ZodNumberFormat: () => _$,
    ZodNumber: () => Cv,
    ZodNullable: () => JO,
    ZodNull: () => lS,
    ZodNonOptional: () => EP,
    ZodNever: () => dS,
    ZodNanoID: () => zP,
    ZodNaN: () => QO,
    ZodMap: () => NO,
    ZodLiteral: () => OO,
    ZodLazy: () => KO,
    ZodKSUID: () => VP,
    ZodJWT: () => HP,
    ZodIssueCode: () => VA,
    ZodIntersection: () => $O,
    ZodISOTime: () => E6,
    ZodISODuration: () => q6,
    ZodISODateTime: () => c6,
    ZodISODate: () => F6,
    ZodIPv6: () => XP,
    ZodIPv4: () => GP,
    ZodGUID: () => Z6,
    ZodFirstPartyTypeKind: () => kP,
    ZodFile: () => DO,
    ZodError: () => DJ,
    ZodEnum: () => Zv,
    ZodEmoji: () => OP,
    ZodEmail: () => PP,
    ZodE164: () => MP,
    ZodDiscriminatedUnion: () => sS,
    ZodDefault: () => AO,
    ZodDate: () => f6,
    ZodCustomStringFormat: () => nS,
    ZodCustom: () => n6,
    ZodCatch: () => BO,
    ZodCUID2: () => JP,
    ZodCUID: () => DP,
    ZodCIDRv6: () => BP,
    ZodCIDRv4: () => WP,
    ZodBoolean: () => rv,
    ZodBigIntFormat: () => jP,
    ZodBigInt: () => Tv,
    ZodBase64URL: () => QP,
    ZodBase64: () => YP,
    ZodArray: () => aS,
    ZodAny: () => iS,
    TimePrecision: () => ON,
    NEVER: () => S4,
    $output: () => UN,
    $input: () => NN,
    $brand: () => O4,
});
var D$ = {};
Y$(D$, {
    version: () => XI,
    util: () => H,
    treeifyError: () => Y4,
    toJSONSchema: () => pN,
    toDotPath: () => WS,
    safeParseAsync: () => H4,
    safeParse: () => M4,
    registry: () => N6,
    regexes: () => j$,
    prettifyError: () => Q4,
    parseAsync: () => lv,
    parse: () => _v,
    locales: () => Wv,
    isValidJWT: () => CS,
    isValidBase64URL: () => RS,
    isValidBase64: () => TI,
    globalRegistry: () => $$,
    globalConfig: () => $v,
    function: () => lN,
    formatError: () => Jv,
    flattenError: () => Dv,
    config: () => r,
    clone: () => l,
    _xid: () => W6,
    _void: () => qN,
    _uuidv7: () => D6,
    _uuidv6: () => z6,
    _uuidv4: () => O6,
    _uuid: () => S6,
    _url: () => J6,
    _uppercase: () => jv,
    _unknown: () => m$,
    _union: () => nD,
    _undefined: () => uN,
    _ulid: () => X6,
    _uint64: () => wN,
    _uint32: () => YN,
    _tuple: () => mN,
    _trim: () => Fv,
    _transform: () => dD,
    _toUpperCase: () => qv,
    _toLowerCase: () => Ev,
    _templateLiteral: () => PJ,
    _symbol: () => bN,
    _success: () => vJ,
    _stringbool: () => hN,
    _stringFormat: () => _N,
    _string: () => PN,
    _startsWith: () => wv,
    _size: () => Qv,
    _set: () => lD,
    _safeParseAsync: () => iv,
    _safeParse: () => pv,
    _regex: () => Mv,
    _refine: () => yN,
    _record: () => _D,
    _readonly: () => NJ,
    _property: () => fN,
    _promise: () => OJ,
    _positive: () => CN,
    _pipe: () => UJ,
    _parseAsync: () => ov,
    _parse: () => hv,
    _overwrite: () => z$,
    _optional: () => eD,
    _number: () => LN,
    _nullable: () => aD,
    _null: () => cN,
    _normalize: () => cv,
    _nonpositive: () => TN,
    _nonoptional: () => $J,
    _nonnegative: () => xN,
    _never: () => EN,
    _negative: () => rN,
    _nativeEnum: () => iD,
    _nanoid: () => L6,
    _nan: () => RN,
    _multipleOf: () => b$,
    _minSize: () => u$,
    _minLength: () => G$,
    _min: () => h,
    _mime: () => uv,
    _maxSize: () => g$,
    _maxLength: () => n$,
    _max: () => d,
    _map: () => oD,
    _lte: () => d,
    _lt: () => S$,
    _lowercase: () => Hv,
    _literal: () => tD,
    _length: () => y$,
    _lazy: () => SJ,
    _ksuid: () => B6,
    _jwt: () => b6,
    _isoTime: () => JN,
    _isoDuration: () => AN,
    _isoDateTime: () => zN,
    _isoDate: () => DN,
    _ipv6: () => Q6,
    _ipv4: () => Y6,
    _intersection: () => hD,
    _int64: () => KN,
    _int32: () => BN,
    _int: () => GN,
    _includes: () => Kv,
    _guid: () => Yv,
    _gte: () => h,
    _gt: () => O$,
    _float64: () => WN,
    _float32: () => XN,
    _file: () => gN,
    _enum: () => pD,
    _endsWith: () => bv,
    _emoji: () => A6,
    _email: () => P6,
    _e164: () => w6,
    _discriminatedUnion: () => yD,
    _default: () => sD,
    _date: () => kN,
    _custom: () => nN,
    _cuid2: () => G6,
    _cuid: () => V6,
    _coercedString: () => SN,
    _coercedNumber: () => VN,
    _coercedDate: () => ZN,
    _coercedBoolean: () => MN,
    _coercedBigint: () => jN,
    _cidrv6: () => H6,
    _cidrv4: () => M6,
    _catch: () => IJ,
    _boolean: () => QN,
    _bigint: () => HN,
    _base64url: () => K6,
    _base64: () => j6,
    _array: () => kv,
    _any: () => FN,
    TimePrecision: () => ON,
    NEVER: () => S4,
    JSONSchemaGenerator: () => u6,
    JSONSchema: () => fS,
    Doc: () => av,
    $output: () => UN,
    $input: () => NN,
    $constructor: () => L,
    $brand: () => O4,
    $ZodXID: () => uI,
    $ZodVoid: () => tI,
    $ZodUnknown: () => f$,
    $ZodUnion: () => U6,
    $ZodUndefined: () => oI,
    $ZodUUID: () => YI,
    $ZodURL: () => MI,
    $ZodULID: () => bI,
    $ZodType: () => w,
    $ZodTuple: () => w$,
    $ZodTransform: () => Vv,
    $ZodTemplateLiteral: () => XU,
    $ZodSymbol: () => _I,
    $ZodSuccess: () => AU,
    $ZodStringFormat: () => Z,
    $ZodString: () => K$,
    $ZodSet: () => IU,
    $ZodRegistry: () => Bv,
    $ZodRecord: () => $U,
    $ZodRealError: () => T$,
    $ZodReadonly: () => GU,
    $ZodPromise: () => WU,
    $ZodPrefault: () => DU,
    $ZodPipe: () => Gv,
    $ZodOptional: () => SU,
    $ZodObject: () => eI,
    $ZodNumberFormat: () => yI,
    $ZodNumber: () => v6,
    $ZodNullable: () => OU,
    $ZodNull: () => lI,
    $ZodNonOptional: () => JU,
    $ZodNever: () => iI,
    $ZodNanoID: () => jI,
    $ZodNaN: () => VU,
    $ZodMap: () => vU,
    $ZodLiteral: () => NU,
    $ZodLazy: () => BU,
    $ZodKSUID: () => cI,
    $ZodJWT: () => gI,
    $ZodIntersection: () => sI,
    $ZodISOTime: () => qI,
    $ZodISODuration: () => kI,
    $ZodISODateTime: () => FI,
    $ZodISODate: () => EI,
    $ZodIPv6: () => RI,
    $ZodIPv4: () => ZI,
    $ZodGUID: () => BI,
    $ZodFunction: () => oN,
    $ZodFile: () => PU,
    $ZodError: () => zv,
    $ZodEnum: () => UU,
    $ZodEmoji: () => HI,
    $ZodEmail: () => QI,
    $ZodE164: () => mI,
    $ZodDiscriminatedUnion: () => aI,
    $ZodDefault: () => zU,
    $ZodDate: () => dI,
    $ZodCustomStringFormat: () => nI,
    $ZodCustom: () => YU,
    $ZodCheckUpperCase: () => zI,
    $ZodCheckStringFormat: () => x$,
    $ZodCheckStartsWith: () => JI,
    $ZodCheckSizeEquals: () => II,
    $ZodCheckRegex: () => SI,
    $ZodCheckProperty: () => LI,
    $ZodCheckOverwrite: () => GI,
    $ZodCheckNumberFormat: () => a4,
    $ZodCheckMultipleOf: () => e4,
    $ZodCheckMinSize: () => vI,
    $ZodCheckMinLength: () => NI,
    $ZodCheckMimeType: () => VI,
    $ZodCheckMaxSize: () => $I,
    $ZodCheckMaxLength: () => UI,
    $ZodCheckLowerCase: () => OI,
    $ZodCheckLessThan: () => dv,
    $ZodCheckLengthEquals: () => PI,
    $ZodCheckIncludes: () => DI,
    $ZodCheckGreaterThan: () => ev,
    $ZodCheckEndsWith: () => AI,
    $ZodCheckBigIntFormat: () => s4,
    $ZodCheck: () => C,
    $ZodCatch: () => LU,
    $ZodCUID2: () => wI,
    $ZodCUID: () => KI,
    $ZodCIDRv6: () => rI,
    $ZodCIDRv4: () => CI,
    $ZodBoolean: () => Av,
    $ZodBigIntFormat: () => hI,
    $ZodBigInt: () => I6,
    $ZodBase64URL: () => fI,
    $ZodBase64: () => xI,
    $ZodAsyncError: () => N$,
    $ZodArray: () => Lv,
    $ZodAny: () => pI,
});
var S4 = Object.freeze({ status: 'aborted' });
function L($, v, U) {
    function N(O, J) {
        var A;
        Object.defineProperty(O, '_zod', {
            value: O._zod ?? {},
            enumerable: !1,
        }),
            (A = O._zod).traits ?? (A.traits = new Set()),
            O._zod.traits.add($),
            v(O, J);
        for (let D in S.prototype)
            if (!(D in O))
                Object.defineProperty(O, D, { value: S.prototype[D].bind(O) });
        (O._zod.constr = S), (O._zod.def = J);
    }
    let I = U?.Parent ?? Object;
    class P extends I {}
    Object.defineProperty(P, 'name', { value: $ });
    function S(O) {
        var J;
        let A = U?.Parent ? new P() : this;
        N(A, O), (J = A._zod).deferred ?? (J.deferred = []);
        for (let D of A._zod.deferred) D();
        return A;
    }
    return (
        Object.defineProperty(S, 'init', { value: N }),
        Object.defineProperty(S, Symbol.hasInstance, {
            value: (O) => {
                if (U?.Parent && O instanceof U.Parent) return !0;
                return O?._zod?.traits?.has($);
            },
        }),
        Object.defineProperty(S, 'name', { value: $ }),
        S
    );
}
var O4 = Symbol('zod_brand');
class N$ extends Error {
    constructor() {
        super(
            'Encountered Promise during synchronous parse. Use .parseAsync() instead.',
        );
    }
}
var $v = {};
function r($) {
    if ($) Object.assign($v, $);
    return $v;
}
var H = {};
Y$(H, {
    unwrapMessage: () => vv,
    stringifyPrimitive: () => M,
    required: () => n1,
    randomString: () => Z1,
    propertyKeyTypes: () => Pv,
    promiseAllObject: () => k1,
    primitiveTypes: () => V4,
    prefixIssues: () => y,
    pick: () => T1,
    partial: () => g1,
    optionalKeys: () => G4,
    omit: () => x1,
    numKeys: () => R1,
    nullish: () => V$,
    normalizeParams: () => Q,
    merge: () => m1,
    jsonStringifyReplacer: () => D4,
    joinValues: () => X,
    issue: () => B4,
    isPlainObject: () => r$,
    isObject: () => C$,
    getSizableOrigin: () => Sv,
    getParsedType: () => C1,
    getLengthableOrigin: () => Ov,
    getEnumValues: () => Iv,
    getElementAtPath: () => q1,
    floatSafeRemainder: () => J4,
    finalizeIssue: () => p,
    extend: () => f1,
    escapeRegex: () => P$,
    esc: () => Q$,
    defineLazy: () => F,
    createTransparentProxy: () => r1,
    clone: () => l,
    cleanRegex: () => Nv,
    cleanEnum: () => y1,
    captureStackTrace: () => yv,
    cached: () => Uv,
    assignProp: () => A4,
    assertNotEqual: () => u1,
    assertNever: () => F1,
    assertIs: () => c1,
    assertEqual: () => b1,
    assert: () => E1,
    allowsEval: () => L4,
    aborted: () => M$,
    NUMBER_FORMAT_RANGES: () => X4,
    Class: () => GS,
    BIGINT_FORMAT_RANGES: () => W4,
});
function b1($) {
    return $;
}
function u1($) {
    return $;
}
function c1($) {}
function F1($) {
    throw new Error();
}
function E1($) {}
function Iv($) {
    let v = Object.values($).filter((N) => typeof N === 'number');
    return Object.entries($)
        .filter(([N, I]) => v.indexOf(+N) === -1)
        .map(([N, I]) => I);
}
function X($, v = '|') {
    return $.map((U) => M(U)).join(v);
}
function D4($, v) {
    if (typeof v === 'bigint') return v.toString();
    return v;
}
function Uv($) {
    return {
        get value() {
            {
                let U = $();
                return Object.defineProperty(this, 'value', { value: U }), U;
            }
            throw new Error('cached value already set');
        },
    };
}
function V$($) {
    return $ === null || $ === void 0;
}
function Nv($) {
    let v = $.startsWith('^') ? 1 : 0,
        U = $.endsWith('$') ? $.length - 1 : $.length;
    return $.slice(v, U);
}
function J4($, v) {
    let U = ($.toString().split('.')[1] || '').length,
        N = (v.toString().split('.')[1] || '').length,
        I = U > N ? U : N,
        P = Number.parseInt($.toFixed(I).replace('.', '')),
        S = Number.parseInt(v.toFixed(I).replace('.', ''));
    return (P % S) / 10 ** I;
}
function F($, v, U) {
    Object.defineProperty($, v, {
        get() {
            {
                let I = U();
                return ($[v] = I), I;
            }
            throw new Error('cached value already set');
        },
        set(I) {
            Object.defineProperty($, v, { value: I });
        },
        configurable: !0,
    });
}
function A4($, v, U) {
    Object.defineProperty($, v, {
        value: U,
        writable: !0,
        enumerable: !0,
        configurable: !0,
    });
}
function q1($, v) {
    if (!v) return $;
    return v.reduce((U, N) => U?.[N], $);
}
function k1($) {
    let v = Object.keys($),
        U = v.map((N) => $[N]);
    return Promise.all(U).then((N) => {
        let I = {};
        for (let P = 0; P < v.length; P++) I[v[P]] = N[P];
        return I;
    });
}
function Z1($ = 10) {
    let U = '';
    for (let N = 0; N < $; N++)
        U += 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)];
    return U;
}
function Q$($) {
    return JSON.stringify($);
}
var yv = Error.captureStackTrace ? Error.captureStackTrace : (...$) => {};
function C$($) {
    return typeof $ === 'object' && $ !== null && !Array.isArray($);
}
var L4 = Uv(() => {
    if (
        typeof navigator !== 'undefined' &&
        navigator?.userAgent?.includes('Cloudflare')
    )
        return !1;
    try {
        return new Function(''), !0;
    } catch ($) {
        return !1;
    }
});
function r$($) {
    if (C$($) === !1) return !1;
    let v = $.constructor;
    if (v === void 0) return !0;
    let U = v.prototype;
    if (C$(U) === !1) return !1;
    if (Object.prototype.hasOwnProperty.call(U, 'isPrototypeOf') === !1)
        return !1;
    return !0;
}
function R1($) {
    let v = 0;
    for (let U in $) if (Object.prototype.hasOwnProperty.call($, U)) v++;
    return v;
}
var C1 = ($) => {
        let v = typeof $;
        switch (v) {
            case 'undefined':
                return 'undefined';
            case 'string':
                return 'string';
            case 'number':
                return Number.isNaN($) ? 'nan' : 'number';
            case 'boolean':
                return 'boolean';
            case 'function':
                return 'function';
            case 'bigint':
                return 'bigint';
            case 'symbol':
                return 'symbol';
            case 'object':
                if (Array.isArray($)) return 'array';
                if ($ === null) return 'null';
                if (
                    $.then &&
                    typeof $.then === 'function' &&
                    $.catch &&
                    typeof $.catch === 'function'
                )
                    return 'promise';
                if (typeof Map !== 'undefined' && $ instanceof Map)
                    return 'map';
                if (typeof Set !== 'undefined' && $ instanceof Set)
                    return 'set';
                if (typeof Date !== 'undefined' && $ instanceof Date)
                    return 'date';
                if (typeof File !== 'undefined' && $ instanceof File)
                    return 'file';
                return 'object';
            default:
                throw new Error(`Unknown data type: ${v}`);
        }
    },
    Pv = new Set(['string', 'number', 'symbol']),
    V4 = new Set([
        'string',
        'number',
        'bigint',
        'boolean',
        'symbol',
        'undefined',
    ]);
function P$($) {
    return $.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
function l($, v, U) {
    let N = new $._zod.constr(v ?? $._zod.def);
    if (!v || U?.parent) N._zod.parent = $;
    return N;
}
function Q($) {
    let v = $;
    if (!v) return {};
    if (typeof v === 'string') return { error: () => v };
    if (v?.message !== void 0) {
        if (v?.error !== void 0)
            throw new Error('Cannot specify both `message` and `error` params');
        v.error = v.message;
    }
    if ((delete v.message, typeof v.error === 'string'))
        return { ...v, error: () => v.error };
    return v;
}
function r1($) {
    let v;
    return new Proxy(
        {},
        {
            get(U, N, I) {
                return v ?? (v = $()), Reflect.get(v, N, I);
            },
            set(U, N, I, P) {
                return v ?? (v = $()), Reflect.set(v, N, I, P);
            },
            has(U, N) {
                return v ?? (v = $()), Reflect.has(v, N);
            },
            deleteProperty(U, N) {
                return v ?? (v = $()), Reflect.deleteProperty(v, N);
            },
            ownKeys(U) {
                return v ?? (v = $()), Reflect.ownKeys(v);
            },
            getOwnPropertyDescriptor(U, N) {
                return v ?? (v = $()), Reflect.getOwnPropertyDescriptor(v, N);
            },
            defineProperty(U, N, I) {
                return v ?? (v = $()), Reflect.defineProperty(v, N, I);
            },
        },
    );
}
function M($) {
    if (typeof $ === 'bigint') return $.toString() + 'n';
    if (typeof $ === 'string') return `"${$}"`;
    return `${$}`;
}
function G4($) {
    return Object.keys($).filter((v) => {
        return (
            $[v]._zod.optin === 'optional' && $[v]._zod.optout === 'optional'
        );
    });
}
var X4 = {
        safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
        int32: [-2147483648, 2147483647],
        uint32: [0, 4294967295],
        float32: [
            -340282346638528860000000000000000000000,
            340282346638528860000000000000000000000,
        ],
        float64: [-Number.MAX_VALUE, Number.MAX_VALUE],
    },
    W4 = {
        int64: [BigInt('-9223372036854775808'), BigInt('9223372036854775807')],
        uint64: [BigInt(0), BigInt('18446744073709551615')],
    };
function T1($, v) {
    let U = {},
        N = $._zod.def;
    for (let I in v) {
        if (!(I in N.shape)) throw new Error(`Unrecognized key: "${I}"`);
        if (!v[I]) continue;
        U[I] = N.shape[I];
    }
    return l($, { ...$._zod.def, shape: U, checks: [] });
}
function x1($, v) {
    let U = { ...$._zod.def.shape },
        N = $._zod.def;
    for (let I in v) {
        if (!(I in N.shape)) throw new Error(`Unrecognized key: "${I}"`);
        if (!v[I]) continue;
        delete U[I];
    }
    return l($, { ...$._zod.def, shape: U, checks: [] });
}
function f1($, v) {
    if (!r$(v))
        throw new Error('Invalid input to extend: expected a plain object');
    let U = {
        ...$._zod.def,
        get shape() {
            let N = { ...$._zod.def.shape, ...v };
            return A4(this, 'shape', N), N;
        },
        checks: [],
    };
    return l($, U);
}
function m1($, v) {
    return l($, {
        ...$._zod.def,
        get shape() {
            let U = { ...$._zod.def.shape, ...v._zod.def.shape };
            return A4(this, 'shape', U), U;
        },
        catchall: v._zod.def.catchall,
        checks: [],
    });
}
function g1($, v, U) {
    let N = v._zod.def.shape,
        I = { ...N };
    if (U)
        for (let P in U) {
            if (!(P in N)) throw new Error(`Unrecognized key: "${P}"`);
            if (!U[P]) continue;
            I[P] = $ ? new $({ type: 'optional', innerType: N[P] }) : N[P];
        }
    else
        for (let P in N)
            I[P] = $ ? new $({ type: 'optional', innerType: N[P] }) : N[P];
    return l(v, { ...v._zod.def, shape: I, checks: [] });
}
function n1($, v, U) {
    let N = v._zod.def.shape,
        I = { ...N };
    if (U)
        for (let P in U) {
            if (!(P in I)) throw new Error(`Unrecognized key: "${P}"`);
            if (!U[P]) continue;
            I[P] = new $({ type: 'nonoptional', innerType: N[P] });
        }
    else
        for (let P in N) I[P] = new $({ type: 'nonoptional', innerType: N[P] });
    return l(v, { ...v._zod.def, shape: I, checks: [] });
}
function M$($, v = 0) {
    for (let U = v; U < $.issues.length; U++)
        if ($.issues[U]?.continue !== !0) return !0;
    return !1;
}
function y($, v) {
    return v.map((U) => {
        var N;
        return (N = U).path ?? (N.path = []), U.path.unshift($), U;
    });
}
function vv($) {
    return typeof $ === 'string' ? $ : $?.message;
}
function p($, v, U) {
    let N = { ...$, path: $.path ?? [] };
    if (!$.message) {
        let I =
            vv($.inst?._zod.def?.error?.($)) ??
            vv(v?.error?.($)) ??
            vv(U.customError?.($)) ??
            vv(U.localeError?.($)) ??
            'Invalid input';
        N.message = I;
    }
    if ((delete N.inst, delete N.continue, !v?.reportInput)) delete N.input;
    return N;
}
function Sv($) {
    if ($ instanceof Set) return 'set';
    if ($ instanceof Map) return 'map';
    if ($ instanceof File) return 'file';
    return 'unknown';
}
function Ov($) {
    if (Array.isArray($)) return 'array';
    if (typeof $ === 'string') return 'string';
    return 'unknown';
}
function B4(...$) {
    let [v, U, N] = $;
    if (typeof v === 'string')
        return { message: v, code: 'custom', input: U, inst: N };
    return { ...v };
}
function y1($) {
    return Object.entries($)
        .filter(([v, U]) => {
            return Number.isNaN(Number.parseInt(v, 10));
        })
        .map((v) => v[1]);
}
class GS {
    constructor(...$) {}
}
var XS = ($, v) => {
        ($.name = '$ZodError'),
            Object.defineProperty($, '_zod', { value: $._zod, enumerable: !1 }),
            Object.defineProperty($, 'issues', { value: v, enumerable: !1 }),
            Object.defineProperty($, 'message', {
                get() {
                    return JSON.stringify(v, D4, 2);
                },
                enumerable: !0,
            }),
            Object.defineProperty($, 'toString', {
                value: () => $.message,
                enumerable: !1,
            });
    },
    zv = L('$ZodError', XS),
    T$ = L('$ZodError', XS, { Parent: Error });
function Dv($, v = (U) => U.message) {
    let U = {},
        N = [];
    for (let I of $.issues)
        if (I.path.length > 0)
            (U[I.path[0]] = U[I.path[0]] || []), U[I.path[0]].push(v(I));
        else N.push(v(I));
    return { formErrors: N, fieldErrors: U };
}
function Jv($, v) {
    let U =
            v ||
            function (P) {
                return P.message;
            },
        N = { _errors: [] },
        I = (P) => {
            for (let S of P.issues)
                if (S.code === 'invalid_union' && S.errors.length)
                    S.errors.map((O) => I({ issues: O }));
                else if (S.code === 'invalid_key') I({ issues: S.issues });
                else if (S.code === 'invalid_element') I({ issues: S.issues });
                else if (S.path.length === 0) N._errors.push(U(S));
                else {
                    let O = N,
                        J = 0;
                    while (J < S.path.length) {
                        let A = S.path[J];
                        if (J !== S.path.length - 1)
                            O[A] = O[A] || { _errors: [] };
                        else
                            (O[A] = O[A] || { _errors: [] }),
                                O[A]._errors.push(U(S));
                        (O = O[A]), J++;
                    }
                }
        };
    return I($), N;
}
function Y4($, v) {
    let U =
            v ||
            function (P) {
                return P.message;
            },
        N = { errors: [] },
        I = (P, S = []) => {
            var O, J;
            for (let A of P.issues)
                if (A.code === 'invalid_union' && A.errors.length)
                    A.errors.map((D) => I({ issues: D }, A.path));
                else if (A.code === 'invalid_key')
                    I({ issues: A.issues }, A.path);
                else if (A.code === 'invalid_element')
                    I({ issues: A.issues }, A.path);
                else {
                    let D = [...S, ...A.path];
                    if (D.length === 0) {
                        N.errors.push(U(A));
                        continue;
                    }
                    let G = N,
                        W = 0;
                    while (W < D.length) {
                        let z = D[W],
                            B = W === D.length - 1;
                        if (typeof z === 'string')
                            G.properties ?? (G.properties = {}),
                                (O = G.properties)[z] ??
                                    (O[z] = { errors: [] }),
                                (G = G.properties[z]);
                        else
                            G.items ?? (G.items = []),
                                (J = G.items)[z] ?? (J[z] = { errors: [] }),
                                (G = G.items[z]);
                        if (B) G.errors.push(U(A));
                        W++;
                    }
                }
        };
    return I($), N;
}
function WS($) {
    let v = [];
    for (let U of $)
        if (typeof U === 'number') v.push(`[${U}]`);
        else if (typeof U === 'symbol')
            v.push(`[${JSON.stringify(String(U))}]`);
        else if (/[^\w$]/.test(U)) v.push(`[${JSON.stringify(U)}]`);
        else {
            if (v.length) v.push('.');
            v.push(U);
        }
    return v.join('');
}
function Q4($) {
    let v = [],
        U = [...$.issues].sort((N, I) => N.path.length - I.path.length);
    for (let N of U)
        if ((v.push(`\u2716 ${N.message}`), N.path?.length))
            v.push(`  \u2192 at ${WS(N.path)}`);
    return v.join(`
`);
}
var hv = ($) => (v, U, N, I) => {
        let P = N ? Object.assign(N, { async: !1 }) : { async: !1 },
            S = v._zod.run({ value: U, issues: [] }, P);
        if (S instanceof Promise) throw new N$();
        if (S.issues.length) {
            let O = new (I?.Err ?? $)(S.issues.map((J) => p(J, P, r())));
            throw (yv(O, I?.callee), O);
        }
        return S.value;
    },
    _v = hv(T$),
    ov = ($) => async (v, U, N, I) => {
        let P = N ? Object.assign(N, { async: !0 }) : { async: !0 },
            S = v._zod.run({ value: U, issues: [] }, P);
        if (S instanceof Promise) S = await S;
        if (S.issues.length) {
            let O = new (I?.Err ?? $)(S.issues.map((J) => p(J, P, r())));
            throw (yv(O, I?.callee), O);
        }
        return S.value;
    },
    lv = ov(T$),
    pv = ($) => (v, U, N) => {
        let I = N ? { ...N, async: !1 } : { async: !1 },
            P = v._zod.run({ value: U, issues: [] }, I);
        if (P instanceof Promise) throw new N$();
        return P.issues.length
            ? {
                  success: !1,
                  error: new ($ ?? zv)(P.issues.map((S) => p(S, I, r()))),
              }
            : { success: !0, data: P.value };
    },
    M4 = pv(T$),
    iv = ($) => async (v, U, N) => {
        let I = N ? Object.assign(N, { async: !0 }) : { async: !0 },
            P = v._zod.run({ value: U, issues: [] }, I);
        if (P instanceof Promise) P = await P;
        return P.issues.length
            ? { success: !1, error: new $(P.issues.map((S) => p(S, I, r()))) }
            : { success: !0, data: P.value };
    },
    H4 = iv(T$);
var j$ = {};
Y$(j$, {
    xid: () => b4,
    uuid7: () => p1,
    uuid6: () => l1,
    uuid4: () => o1,
    uuid: () => H$,
    uppercase: () => d4,
    unicodeEmail: () => d1,
    undefined: () => i4,
    ulid: () => w4,
    time: () => g4,
    string: () => y4,
    rfc5322Email: () => t1,
    number: () => o4,
    null: () => p4,
    nanoid: () => c4,
    lowercase: () => t4,
    ksuid: () => u4,
    ipv6: () => R4,
    ipv4: () => Z4,
    integer: () => _4,
    html5Email: () => i1,
    hostname: () => x4,
    guid: () => E4,
    extendedDuration: () => _1,
    emoji: () => k4,
    email: () => q4,
    e164: () => f4,
    duration: () => F4,
    domain: () => a1,
    datetime: () => n4,
    date: () => m4,
    cuid2: () => K4,
    cuid: () => j4,
    cidrv6: () => r4,
    cidrv4: () => C4,
    browserEmail: () => e1,
    boolean: () => l4,
    bigint: () => h4,
    base64url: () => tv,
    base64: () => T4,
});
var j4 = /^[cC][^\s-]{8,}$/,
    K4 = /^[0-9a-z]+$/,
    w4 = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/,
    b4 = /^[0-9a-vA-V]{20}$/,
    u4 = /^[A-Za-z0-9]{27}$/,
    c4 = /^[a-zA-Z0-9_-]{21}$/,
    F4 =
        /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/,
    _1 =
        /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,
    E4 =
        /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,
    H$ = ($) => {
        if (!$)
            return /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$/;
        return new RegExp(
            `^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${$}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`,
        );
    },
    o1 = H$(4),
    l1 = H$(6),
    p1 = H$(7),
    q4 =
        /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/,
    i1 =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    t1 =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    d1 = /^[^\s@"]{1,64}@[^\s@]{1,255}$/u,
    e1 =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
function k4() {
    return new RegExp(
        '^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$',
        'u',
    );
}
var Z4 =
        /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
    R4 =
        /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})$/,
    C4 =
        /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,
    r4 =
        /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
    T4 =
        /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,
    tv = /^[A-Za-z0-9_-]*$/,
    x4 = /^([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+$/,
    a1 = /^([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/,
    f4 = /^\+(?:[0-9]){6,14}[0-9]$/,
    BS =
        '(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))',
    m4 = new RegExp(`^${BS}$`);
function YS($) {
    return typeof $.precision === 'number'
        ? $.precision === -1
            ? '(?:[01]\\d|2[0-3]):[0-5]\\d'
            : $.precision === 0
              ? '(?:[01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d'
              : `(?:[01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d\\.\\d{${$.precision}}`
        : '(?:[01]\\d|2[0-3]):[0-5]\\d(?::[0-5]\\d(?:\\.\\d+)?)?';
}
function g4($) {
    return new RegExp(`^${YS($)}$`);
}
function n4($) {
    let v = YS({ precision: $.precision }),
        U = ['Z'];
    if ($.local) U.push('');
    if ($.offset) U.push('([+-]\\d{2}:\\d{2})');
    let N = `${v}(?:${U.join('|')})`;
    return new RegExp(`^${BS}T(?:${N})$`);
}
var y4 = ($) => {
        let v = $
            ? `[\\s\\S]{${$?.minimum ?? 0},${$?.maximum ?? ''}}`
            : '[\\s\\S]*';
        return new RegExp(`^${v}$`);
    },
    h4 = /^\d+n?$/,
    _4 = /^\d+$/,
    o4 = /^-?\d+(?:\.\d+)?/i,
    l4 = /true|false/i,
    p4 = /null/i;
var i4 = /undefined/i;
var t4 = /^[^A-Z]*$/,
    d4 = /^[^a-z]*$/;
var C = L('$ZodCheck', ($, v) => {
        var U;
        $._zod ?? ($._zod = {}),
            ($._zod.def = v),
            (U = $._zod).onattach ?? (U.onattach = []);
    }),
    MS = { number: 'number', bigint: 'bigint', object: 'date' },
    dv = L('$ZodCheckLessThan', ($, v) => {
        C.init($, v);
        let U = MS[typeof v.value];
        $._zod.onattach.push((N) => {
            let I = N._zod.bag,
                P =
                    (v.inclusive ? I.maximum : I.exclusiveMaximum) ??
                    Number.POSITIVE_INFINITY;
            if (v.value < P)
                if (v.inclusive) I.maximum = v.value;
                else I.exclusiveMaximum = v.value;
        }),
            ($._zod.check = (N) => {
                if (v.inclusive ? N.value <= v.value : N.value < v.value)
                    return;
                N.issues.push({
                    origin: U,
                    code: 'too_big',
                    maximum: v.value,
                    input: N.value,
                    inclusive: v.inclusive,
                    inst: $,
                    continue: !v.abort,
                });
            });
    }),
    ev = L('$ZodCheckGreaterThan', ($, v) => {
        C.init($, v);
        let U = MS[typeof v.value];
        $._zod.onattach.push((N) => {
            let I = N._zod.bag,
                P =
                    (v.inclusive ? I.minimum : I.exclusiveMinimum) ??
                    Number.NEGATIVE_INFINITY;
            if (v.value > P)
                if (v.inclusive) I.minimum = v.value;
                else I.exclusiveMinimum = v.value;
        }),
            ($._zod.check = (N) => {
                if (v.inclusive ? N.value >= v.value : N.value > v.value)
                    return;
                N.issues.push({
                    origin: U,
                    code: 'too_small',
                    minimum: v.value,
                    input: N.value,
                    inclusive: v.inclusive,
                    inst: $,
                    continue: !v.abort,
                });
            });
    }),
    e4 = L('$ZodCheckMultipleOf', ($, v) => {
        C.init($, v),
            $._zod.onattach.push((U) => {
                var N;
                (N = U._zod.bag).multipleOf ?? (N.multipleOf = v.value);
            }),
            ($._zod.check = (U) => {
                if (typeof U.value !== typeof v.value)
                    throw new Error(
                        'Cannot mix number and bigint in multiple_of check.',
                    );
                if (
                    typeof U.value === 'bigint'
                        ? U.value % v.value === BigInt(0)
                        : J4(U.value, v.value) === 0
                )
                    return;
                U.issues.push({
                    origin: typeof U.value,
                    code: 'not_multiple_of',
                    divisor: v.value,
                    input: U.value,
                    inst: $,
                    continue: !v.abort,
                });
            });
    }),
    a4 = L('$ZodCheckNumberFormat', ($, v) => {
        C.init($, v), (v.format = v.format || 'float64');
        let U = v.format?.includes('int'),
            N = U ? 'int' : 'number',
            [I, P] = X4[v.format];
        $._zod.onattach.push((S) => {
            let O = S._zod.bag;
            if (((O.format = v.format), (O.minimum = I), (O.maximum = P), U))
                O.pattern = _4;
        }),
            ($._zod.check = (S) => {
                let O = S.value;
                if (U) {
                    if (!Number.isInteger(O)) {
                        S.issues.push({
                            expected: N,
                            format: v.format,
                            code: 'invalid_type',
                            input: O,
                            inst: $,
                        });
                        return;
                    }
                    if (!Number.isSafeInteger(O)) {
                        if (O > 0)
                            S.issues.push({
                                input: O,
                                code: 'too_big',
                                maximum: Number.MAX_SAFE_INTEGER,
                                note: 'Integers must be within the safe integer range.',
                                inst: $,
                                origin: N,
                                continue: !v.abort,
                            });
                        else
                            S.issues.push({
                                input: O,
                                code: 'too_small',
                                minimum: Number.MIN_SAFE_INTEGER,
                                note: 'Integers must be within the safe integer range.',
                                inst: $,
                                origin: N,
                                continue: !v.abort,
                            });
                        return;
                    }
                }
                if (O < I)
                    S.issues.push({
                        origin: 'number',
                        input: O,
                        code: 'too_small',
                        minimum: I,
                        inclusive: !0,
                        inst: $,
                        continue: !v.abort,
                    });
                if (O > P)
                    S.issues.push({
                        origin: 'number',
                        input: O,
                        code: 'too_big',
                        maximum: P,
                        inst: $,
                    });
            });
    }),
    s4 = L('$ZodCheckBigIntFormat', ($, v) => {
        C.init($, v);
        let [U, N] = W4[v.format];
        $._zod.onattach.push((I) => {
            let P = I._zod.bag;
            (P.format = v.format), (P.minimum = U), (P.maximum = N);
        }),
            ($._zod.check = (I) => {
                let P = I.value;
                if (P < U)
                    I.issues.push({
                        origin: 'bigint',
                        input: P,
                        code: 'too_small',
                        minimum: U,
                        inclusive: !0,
                        inst: $,
                        continue: !v.abort,
                    });
                if (P > N)
                    I.issues.push({
                        origin: 'bigint',
                        input: P,
                        code: 'too_big',
                        maximum: N,
                        inst: $,
                    });
            });
    }),
    $I = L('$ZodCheckMaxSize', ($, v) => {
        var U;
        C.init($, v),
            (U = $._zod.def).when ??
                (U.when = (N) => {
                    let I = N.value;
                    return !V$(I) && I.size !== void 0;
                }),
            $._zod.onattach.push((N) => {
                let I = N._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
                if (v.maximum < I) N._zod.bag.maximum = v.maximum;
            }),
            ($._zod.check = (N) => {
                let I = N.value;
                if (I.size <= v.maximum) return;
                N.issues.push({
                    origin: Sv(I),
                    code: 'too_big',
                    maximum: v.maximum,
                    input: I,
                    inst: $,
                    continue: !v.abort,
                });
            });
    }),
    vI = L('$ZodCheckMinSize', ($, v) => {
        var U;
        C.init($, v),
            (U = $._zod.def).when ??
                (U.when = (N) => {
                    let I = N.value;
                    return !V$(I) && I.size !== void 0;
                }),
            $._zod.onattach.push((N) => {
                let I = N._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
                if (v.minimum > I) N._zod.bag.minimum = v.minimum;
            }),
            ($._zod.check = (N) => {
                let I = N.value;
                if (I.size >= v.minimum) return;
                N.issues.push({
                    origin: Sv(I),
                    code: 'too_small',
                    minimum: v.minimum,
                    input: I,
                    inst: $,
                    continue: !v.abort,
                });
            });
    }),
    II = L('$ZodCheckSizeEquals', ($, v) => {
        var U;
        C.init($, v),
            (U = $._zod.def).when ??
                (U.when = (N) => {
                    let I = N.value;
                    return !V$(I) && I.size !== void 0;
                }),
            $._zod.onattach.push((N) => {
                let I = N._zod.bag;
                (I.minimum = v.size), (I.maximum = v.size), (I.size = v.size);
            }),
            ($._zod.check = (N) => {
                let I = N.value,
                    P = I.size;
                if (P === v.size) return;
                let S = P > v.size;
                N.issues.push({
                    origin: Sv(I),
                    ...(S
                        ? { code: 'too_big', maximum: v.size }
                        : { code: 'too_small', minimum: v.size }),
                    inclusive: !0,
                    exact: !0,
                    input: N.value,
                    inst: $,
                    continue: !v.abort,
                });
            });
    }),
    UI = L('$ZodCheckMaxLength', ($, v) => {
        var U;
        C.init($, v),
            (U = $._zod.def).when ??
                (U.when = (N) => {
                    let I = N.value;
                    return !V$(I) && I.length !== void 0;
                }),
            $._zod.onattach.push((N) => {
                let I = N._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
                if (v.maximum < I) N._zod.bag.maximum = v.maximum;
            }),
            ($._zod.check = (N) => {
                let I = N.value;
                if (I.length <= v.maximum) return;
                let S = Ov(I);
                N.issues.push({
                    origin: S,
                    code: 'too_big',
                    maximum: v.maximum,
                    inclusive: !0,
                    input: I,
                    inst: $,
                    continue: !v.abort,
                });
            });
    }),
    NI = L('$ZodCheckMinLength', ($, v) => {
        var U;
        C.init($, v),
            (U = $._zod.def).when ??
                (U.when = (N) => {
                    let I = N.value;
                    return !V$(I) && I.length !== void 0;
                }),
            $._zod.onattach.push((N) => {
                let I = N._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
                if (v.minimum > I) N._zod.bag.minimum = v.minimum;
            }),
            ($._zod.check = (N) => {
                let I = N.value;
                if (I.length >= v.minimum) return;
                let S = Ov(I);
                N.issues.push({
                    origin: S,
                    code: 'too_small',
                    minimum: v.minimum,
                    inclusive: !0,
                    input: I,
                    inst: $,
                    continue: !v.abort,
                });
            });
    }),
    PI = L('$ZodCheckLengthEquals', ($, v) => {
        var U;
        C.init($, v),
            (U = $._zod.def).when ??
                (U.when = (N) => {
                    let I = N.value;
                    return !V$(I) && I.length !== void 0;
                }),
            $._zod.onattach.push((N) => {
                let I = N._zod.bag;
                (I.minimum = v.length),
                    (I.maximum = v.length),
                    (I.length = v.length);
            }),
            ($._zod.check = (N) => {
                let I = N.value,
                    P = I.length;
                if (P === v.length) return;
                let S = Ov(I),
                    O = P > v.length;
                N.issues.push({
                    origin: S,
                    ...(O
                        ? { code: 'too_big', maximum: v.length }
                        : { code: 'too_small', minimum: v.length }),
                    inclusive: !0,
                    exact: !0,
                    input: N.value,
                    inst: $,
                    continue: !v.abort,
                });
            });
    }),
    x$ = L('$ZodCheckStringFormat', ($, v) => {
        var U, N;
        if (
            (C.init($, v),
            $._zod.onattach.push((I) => {
                let P = I._zod.bag;
                if (((P.format = v.format), v.pattern))
                    P.patterns ?? (P.patterns = new Set()),
                        P.patterns.add(v.pattern);
            }),
            v.pattern)
        )
            (U = $._zod).check ??
                (U.check = (I) => {
                    if (((v.pattern.lastIndex = 0), v.pattern.test(I.value)))
                        return;
                    I.issues.push({
                        origin: 'string',
                        code: 'invalid_format',
                        format: v.format,
                        input: I.value,
                        ...(v.pattern ? { pattern: v.pattern.toString() } : {}),
                        inst: $,
                        continue: !v.abort,
                    });
                });
        else (N = $._zod).check ?? (N.check = () => {});
    }),
    SI = L('$ZodCheckRegex', ($, v) => {
        x$.init($, v),
            ($._zod.check = (U) => {
                if (((v.pattern.lastIndex = 0), v.pattern.test(U.value)))
                    return;
                U.issues.push({
                    origin: 'string',
                    code: 'invalid_format',
                    format: 'regex',
                    input: U.value,
                    pattern: v.pattern.toString(),
                    inst: $,
                    continue: !v.abort,
                });
            });
    }),
    OI = L('$ZodCheckLowerCase', ($, v) => {
        v.pattern ?? (v.pattern = t4), x$.init($, v);
    }),
    zI = L('$ZodCheckUpperCase', ($, v) => {
        v.pattern ?? (v.pattern = d4), x$.init($, v);
    }),
    DI = L('$ZodCheckIncludes', ($, v) => {
        C.init($, v);
        let U = P$(v.includes),
            N = new RegExp(
                typeof v.position === 'number' ? `^.{${v.position}}${U}` : U,
            );
        (v.pattern = N),
            $._zod.onattach.push((I) => {
                let P = I._zod.bag;
                P.patterns ?? (P.patterns = new Set()), P.patterns.add(N);
            }),
            ($._zod.check = (I) => {
                if (I.value.includes(v.includes, v.position)) return;
                I.issues.push({
                    origin: 'string',
                    code: 'invalid_format',
                    format: 'includes',
                    includes: v.includes,
                    input: I.value,
                    inst: $,
                    continue: !v.abort,
                });
            });
    }),
    JI = L('$ZodCheckStartsWith', ($, v) => {
        C.init($, v);
        let U = new RegExp(`^${P$(v.prefix)}.*`);
        v.pattern ?? (v.pattern = U),
            $._zod.onattach.push((N) => {
                let I = N._zod.bag;
                I.patterns ?? (I.patterns = new Set()), I.patterns.add(U);
            }),
            ($._zod.check = (N) => {
                if (N.value.startsWith(v.prefix)) return;
                N.issues.push({
                    origin: 'string',
                    code: 'invalid_format',
                    format: 'starts_with',
                    prefix: v.prefix,
                    input: N.value,
                    inst: $,
                    continue: !v.abort,
                });
            });
    }),
    AI = L('$ZodCheckEndsWith', ($, v) => {
        C.init($, v);
        let U = new RegExp(`.*${P$(v.suffix)}$`);
        v.pattern ?? (v.pattern = U),
            $._zod.onattach.push((N) => {
                let I = N._zod.bag;
                I.patterns ?? (I.patterns = new Set()), I.patterns.add(U);
            }),
            ($._zod.check = (N) => {
                if (N.value.endsWith(v.suffix)) return;
                N.issues.push({
                    origin: 'string',
                    code: 'invalid_format',
                    format: 'ends_with',
                    suffix: v.suffix,
                    input: N.value,
                    inst: $,
                    continue: !v.abort,
                });
            });
    });
function QS($, v, U) {
    if ($.issues.length) v.issues.push(...y(U, $.issues));
}
var LI = L('$ZodCheckProperty', ($, v) => {
        C.init($, v),
            ($._zod.check = (U) => {
                let N = v.schema._zod.run(
                    { value: U.value[v.property], issues: [] },
                    {},
                );
                if (N instanceof Promise)
                    return N.then((I) => QS(I, U, v.property));
                QS(N, U, v.property);
                return;
            });
    }),
    VI = L('$ZodCheckMimeType', ($, v) => {
        C.init($, v);
        let U = new Set(v.mime);
        $._zod.onattach.push((N) => {
            N._zod.bag.mime = v.mime;
        }),
            ($._zod.check = (N) => {
                if (U.has(N.value.type)) return;
                N.issues.push({
                    code: 'invalid_value',
                    values: v.mime,
                    input: N.value.type,
                    inst: $,
                });
            });
    }),
    GI = L('$ZodCheckOverwrite', ($, v) => {
        C.init($, v),
            ($._zod.check = (U) => {
                U.value = v.tx(U.value);
            });
    });
class av {
    constructor($ = []) {
        if (((this.content = []), (this.indent = 0), this)) this.args = $;
    }
    indented($) {
        (this.indent += 1), $(this), (this.indent -= 1);
    }
    write($) {
        if (typeof $ === 'function') {
            $(this, { execution: 'sync' }), $(this, { execution: 'async' });
            return;
        }
        let U = $.split(`
`).filter((P) => P),
            N = Math.min(...U.map((P) => P.length - P.trimStart().length)),
            I = U.map((P) => P.slice(N)).map(
                (P) => ' '.repeat(this.indent * 2) + P,
            );
        for (let P of I) this.content.push(P);
    }
    compile() {
        let $ = Function,
            v = this?.args,
            N = [...(this?.content ?? ['']).map((I) => `  ${I}`)];
        return new $(
            ...v,
            N.join(`
`),
        );
    }
}
var XI = { major: 4, minor: 0, patch: 5 };
var w = L('$ZodType', ($, v) => {
        var U;
        $ ?? ($ = {}),
            ($._zod.def = v),
            ($._zod.bag = $._zod.bag || {}),
            ($._zod.version = XI);
        let N = [...($._zod.def.checks ?? [])];
        if ($._zod.traits.has('$ZodCheck')) N.unshift($);
        for (let I of N) for (let P of I._zod.onattach) P($);
        if (N.length === 0)
            (U = $._zod).deferred ?? (U.deferred = []),
                $._zod.deferred?.push(() => {
                    $._zod.run = $._zod.parse;
                });
        else {
            let I = (P, S, O) => {
                let J = M$(P),
                    A;
                for (let D of S) {
                    if (D._zod.def.when) {
                        if (!D._zod.def.when(P)) continue;
                    } else if (J) continue;
                    let G = P.issues.length,
                        W = D._zod.check(P);
                    if (W instanceof Promise && O?.async === !1) throw new N$();
                    if (A || W instanceof Promise)
                        A = (A ?? Promise.resolve()).then(async () => {
                            if ((await W, P.issues.length === G)) return;
                            if (!J) J = M$(P, G);
                        });
                    else {
                        if (P.issues.length === G) continue;
                        if (!J) J = M$(P, G);
                    }
                }
                if (A)
                    return A.then(() => {
                        return P;
                    });
                return P;
            };
            $._zod.run = (P, S) => {
                let O = $._zod.parse(P, S);
                if (O instanceof Promise) {
                    if (S.async === !1) throw new N$();
                    return O.then((J) => I(J, N, S));
                }
                return I(O, N, S);
            };
        }
        $['~standard'] = {
            validate: (I) => {
                try {
                    let P = M4($, I);
                    return P.success
                        ? { value: P.data }
                        : { issues: P.error?.issues };
                } catch (P) {
                    return H4($, I).then((S) =>
                        S.success
                            ? { value: S.data }
                            : { issues: S.error?.issues },
                    );
                }
            },
            vendor: 'zod',
            version: 1,
        };
    }),
    K$ = L('$ZodString', ($, v) => {
        w.init($, v),
            ($._zod.pattern =
                [...($?._zod.bag?.patterns ?? [])].pop() ?? y4($._zod.bag)),
            ($._zod.parse = (U, N) => {
                if (v.coerce)
                    try {
                        U.value = String(U.value);
                    } catch (I) {}
                if (typeof U.value === 'string') return U;
                return (
                    U.issues.push({
                        expected: 'string',
                        code: 'invalid_type',
                        input: U.value,
                        inst: $,
                    }),
                    U
                );
            });
    }),
    Z = L('$ZodStringFormat', ($, v) => {
        x$.init($, v), K$.init($, v);
    }),
    BI = L('$ZodGUID', ($, v) => {
        v.pattern ?? (v.pattern = E4), Z.init($, v);
    }),
    YI = L('$ZodUUID', ($, v) => {
        if (v.version) {
            let N = { v1: 1, v2: 2, v3: 3, v4: 4, v5: 5, v6: 6, v7: 7, v8: 8 }[
                v.version
            ];
            if (N === void 0)
                throw new Error(`Invalid UUID version: "${v.version}"`);
            v.pattern ?? (v.pattern = H$(N));
        } else v.pattern ?? (v.pattern = H$());
        Z.init($, v);
    }),
    QI = L('$ZodEmail', ($, v) => {
        v.pattern ?? (v.pattern = q4), Z.init($, v);
    }),
    MI = L('$ZodURL', ($, v) => {
        Z.init($, v),
            ($._zod.check = (U) => {
                try {
                    let N = U.value,
                        I = new URL(N),
                        P = I.href;
                    if (v.hostname) {
                        if (
                            ((v.hostname.lastIndex = 0),
                            !v.hostname.test(I.hostname))
                        )
                            U.issues.push({
                                code: 'invalid_format',
                                format: 'url',
                                note: 'Invalid hostname',
                                pattern: x4.source,
                                input: U.value,
                                inst: $,
                                continue: !v.abort,
                            });
                    }
                    if (v.protocol) {
                        if (
                            ((v.protocol.lastIndex = 0),
                            !v.protocol.test(
                                I.protocol.endsWith(':')
                                    ? I.protocol.slice(0, -1)
                                    : I.protocol,
                            ))
                        )
                            U.issues.push({
                                code: 'invalid_format',
                                format: 'url',
                                note: 'Invalid protocol',
                                pattern: v.protocol.source,
                                input: U.value,
                                inst: $,
                                continue: !v.abort,
                            });
                    }
                    if (!N.endsWith('/') && P.endsWith('/'))
                        U.value = P.slice(0, -1);
                    else U.value = P;
                    return;
                } catch (N) {
                    U.issues.push({
                        code: 'invalid_format',
                        format: 'url',
                        input: U.value,
                        inst: $,
                        continue: !v.abort,
                    });
                }
            });
    }),
    HI = L('$ZodEmoji', ($, v) => {
        v.pattern ?? (v.pattern = k4()), Z.init($, v);
    }),
    jI = L('$ZodNanoID', ($, v) => {
        v.pattern ?? (v.pattern = c4), Z.init($, v);
    }),
    KI = L('$ZodCUID', ($, v) => {
        v.pattern ?? (v.pattern = j4), Z.init($, v);
    }),
    wI = L('$ZodCUID2', ($, v) => {
        v.pattern ?? (v.pattern = K4), Z.init($, v);
    }),
    bI = L('$ZodULID', ($, v) => {
        v.pattern ?? (v.pattern = w4), Z.init($, v);
    }),
    uI = L('$ZodXID', ($, v) => {
        v.pattern ?? (v.pattern = b4), Z.init($, v);
    }),
    cI = L('$ZodKSUID', ($, v) => {
        v.pattern ?? (v.pattern = u4), Z.init($, v);
    }),
    FI = L('$ZodISODateTime', ($, v) => {
        v.pattern ?? (v.pattern = n4(v)), Z.init($, v);
    }),
    EI = L('$ZodISODate', ($, v) => {
        v.pattern ?? (v.pattern = m4), Z.init($, v);
    }),
    qI = L('$ZodISOTime', ($, v) => {
        v.pattern ?? (v.pattern = g4(v)), Z.init($, v);
    }),
    kI = L('$ZodISODuration', ($, v) => {
        v.pattern ?? (v.pattern = F4), Z.init($, v);
    }),
    ZI = L('$ZodIPv4', ($, v) => {
        v.pattern ?? (v.pattern = Z4),
            Z.init($, v),
            $._zod.onattach.push((U) => {
                let N = U._zod.bag;
                N.format = 'ipv4';
            });
    }),
    RI = L('$ZodIPv6', ($, v) => {
        v.pattern ?? (v.pattern = R4),
            Z.init($, v),
            $._zod.onattach.push((U) => {
                let N = U._zod.bag;
                N.format = 'ipv6';
            }),
            ($._zod.check = (U) => {
                try {
                    new URL(`http://[${U.value}]`);
                } catch {
                    U.issues.push({
                        code: 'invalid_format',
                        format: 'ipv6',
                        input: U.value,
                        inst: $,
                        continue: !v.abort,
                    });
                }
            });
    }),
    CI = L('$ZodCIDRv4', ($, v) => {
        v.pattern ?? (v.pattern = C4), Z.init($, v);
    }),
    rI = L('$ZodCIDRv6', ($, v) => {
        v.pattern ?? (v.pattern = r4),
            Z.init($, v),
            ($._zod.check = (U) => {
                let [N, I] = U.value.split('/');
                try {
                    if (!I) throw new Error();
                    let P = Number(I);
                    if (`${P}` !== I) throw new Error();
                    if (P < 0 || P > 128) throw new Error();
                    new URL(`http://[${N}]`);
                } catch {
                    U.issues.push({
                        code: 'invalid_format',
                        format: 'cidrv6',
                        input: U.value,
                        inst: $,
                        continue: !v.abort,
                    });
                }
            });
    });
function TI($) {
    if ($ === '') return !0;
    if ($.length % 4 !== 0) return !1;
    try {
        return atob($), !0;
    } catch {
        return !1;
    }
}
var xI = L('$ZodBase64', ($, v) => {
    v.pattern ?? (v.pattern = T4),
        Z.init($, v),
        $._zod.onattach.push((U) => {
            U._zod.bag.contentEncoding = 'base64';
        }),
        ($._zod.check = (U) => {
            if (TI(U.value)) return;
            U.issues.push({
                code: 'invalid_format',
                format: 'base64',
                input: U.value,
                inst: $,
                continue: !v.abort,
            });
        });
});
function RS($) {
    if (!tv.test($)) return !1;
    let v = $.replace(/[-_]/g, (N) => (N === '-' ? '+' : '/')),
        U = v.padEnd(Math.ceil(v.length / 4) * 4, '=');
    return TI(U);
}
var fI = L('$ZodBase64URL', ($, v) => {
        v.pattern ?? (v.pattern = tv),
            Z.init($, v),
            $._zod.onattach.push((U) => {
                U._zod.bag.contentEncoding = 'base64url';
            }),
            ($._zod.check = (U) => {
                if (RS(U.value)) return;
                U.issues.push({
                    code: 'invalid_format',
                    format: 'base64url',
                    input: U.value,
                    inst: $,
                    continue: !v.abort,
                });
            });
    }),
    mI = L('$ZodE164', ($, v) => {
        v.pattern ?? (v.pattern = f4), Z.init($, v);
    });
function CS($, v = null) {
    try {
        let U = $.split('.');
        if (U.length !== 3) return !1;
        let [N] = U;
        if (!N) return !1;
        let I = JSON.parse(atob(N));
        if ('typ' in I && I?.typ !== 'JWT') return !1;
        if (!I.alg) return !1;
        if (v && (!('alg' in I) || I.alg !== v)) return !1;
        return !0;
    } catch {
        return !1;
    }
}
var gI = L('$ZodJWT', ($, v) => {
        Z.init($, v),
            ($._zod.check = (U) => {
                if (CS(U.value, v.alg)) return;
                U.issues.push({
                    code: 'invalid_format',
                    format: 'jwt',
                    input: U.value,
                    inst: $,
                    continue: !v.abort,
                });
            });
    }),
    nI = L('$ZodCustomStringFormat', ($, v) => {
        Z.init($, v),
            ($._zod.check = (U) => {
                if (v.fn(U.value)) return;
                U.issues.push({
                    code: 'invalid_format',
                    format: v.format,
                    input: U.value,
                    inst: $,
                    continue: !v.abort,
                });
            });
    }),
    v6 = L('$ZodNumber', ($, v) => {
        w.init($, v),
            ($._zod.pattern = $._zod.bag.pattern ?? o4),
            ($._zod.parse = (U, N) => {
                if (v.coerce)
                    try {
                        U.value = Number(U.value);
                    } catch (S) {}
                let I = U.value;
                if (
                    typeof I === 'number' &&
                    !Number.isNaN(I) &&
                    Number.isFinite(I)
                )
                    return U;
                let P =
                    typeof I === 'number'
                        ? Number.isNaN(I)
                            ? 'NaN'
                            : !Number.isFinite(I)
                              ? 'Infinity'
                              : void 0
                        : void 0;
                return (
                    U.issues.push({
                        expected: 'number',
                        code: 'invalid_type',
                        input: I,
                        inst: $,
                        ...(P ? { received: P } : {}),
                    }),
                    U
                );
            });
    }),
    yI = L('$ZodNumber', ($, v) => {
        a4.init($, v), v6.init($, v);
    }),
    Av = L('$ZodBoolean', ($, v) => {
        w.init($, v),
            ($._zod.pattern = l4),
            ($._zod.parse = (U, N) => {
                if (v.coerce)
                    try {
                        U.value = Boolean(U.value);
                    } catch (P) {}
                let I = U.value;
                if (typeof I === 'boolean') return U;
                return (
                    U.issues.push({
                        expected: 'boolean',
                        code: 'invalid_type',
                        input: I,
                        inst: $,
                    }),
                    U
                );
            });
    }),
    I6 = L('$ZodBigInt', ($, v) => {
        w.init($, v),
            ($._zod.pattern = h4),
            ($._zod.parse = (U, N) => {
                if (v.coerce)
                    try {
                        U.value = BigInt(U.value);
                    } catch (I) {}
                if (typeof U.value === 'bigint') return U;
                return (
                    U.issues.push({
                        expected: 'bigint',
                        code: 'invalid_type',
                        input: U.value,
                        inst: $,
                    }),
                    U
                );
            });
    }),
    hI = L('$ZodBigInt', ($, v) => {
        s4.init($, v), I6.init($, v);
    }),
    _I = L('$ZodSymbol', ($, v) => {
        w.init($, v),
            ($._zod.parse = (U, N) => {
                let I = U.value;
                if (typeof I === 'symbol') return U;
                return (
                    U.issues.push({
                        expected: 'symbol',
                        code: 'invalid_type',
                        input: I,
                        inst: $,
                    }),
                    U
                );
            });
    }),
    oI = L('$ZodUndefined', ($, v) => {
        w.init($, v),
            ($._zod.pattern = i4),
            ($._zod.values = new Set([void 0])),
            ($._zod.optin = 'optional'),
            ($._zod.optout = 'optional'),
            ($._zod.parse = (U, N) => {
                let I = U.value;
                if (typeof I === 'undefined') return U;
                return (
                    U.issues.push({
                        expected: 'undefined',
                        code: 'invalid_type',
                        input: I,
                        inst: $,
                    }),
                    U
                );
            });
    }),
    lI = L('$ZodNull', ($, v) => {
        w.init($, v),
            ($._zod.pattern = p4),
            ($._zod.values = new Set([null])),
            ($._zod.parse = (U, N) => {
                let I = U.value;
                if (I === null) return U;
                return (
                    U.issues.push({
                        expected: 'null',
                        code: 'invalid_type',
                        input: I,
                        inst: $,
                    }),
                    U
                );
            });
    }),
    pI = L('$ZodAny', ($, v) => {
        w.init($, v), ($._zod.parse = (U) => U);
    }),
    f$ = L('$ZodUnknown', ($, v) => {
        w.init($, v), ($._zod.parse = (U) => U);
    }),
    iI = L('$ZodNever', ($, v) => {
        w.init($, v),
            ($._zod.parse = (U, N) => {
                return (
                    U.issues.push({
                        expected: 'never',
                        code: 'invalid_type',
                        input: U.value,
                        inst: $,
                    }),
                    U
                );
            });
    }),
    tI = L('$ZodVoid', ($, v) => {
        w.init($, v),
            ($._zod.parse = (U, N) => {
                let I = U.value;
                if (typeof I === 'undefined') return U;
                return (
                    U.issues.push({
                        expected: 'void',
                        code: 'invalid_type',
                        input: I,
                        inst: $,
                    }),
                    U
                );
            });
    }),
    dI = L('$ZodDate', ($, v) => {
        w.init($, v),
            ($._zod.parse = (U, N) => {
                if (v.coerce)
                    try {
                        U.value = new Date(U.value);
                    } catch (O) {}
                let I = U.value,
                    P = I instanceof Date;
                if (P && !Number.isNaN(I.getTime())) return U;
                return (
                    U.issues.push({
                        expected: 'date',
                        code: 'invalid_type',
                        input: I,
                        ...(P ? { received: 'Invalid Date' } : {}),
                        inst: $,
                    }),
                    U
                );
            });
    });
function jS($, v, U) {
    if ($.issues.length) v.issues.push(...y(U, $.issues));
    v.value[U] = $.value;
}
var Lv = L('$ZodArray', ($, v) => {
    w.init($, v),
        ($._zod.parse = (U, N) => {
            let I = U.value;
            if (!Array.isArray(I))
                return (
                    U.issues.push({
                        expected: 'array',
                        code: 'invalid_type',
                        input: I,
                        inst: $,
                    }),
                    U
                );
            U.value = Array(I.length);
            let P = [];
            for (let S = 0; S < I.length; S++) {
                let O = I[S],
                    J = v.element._zod.run({ value: O, issues: [] }, N);
                if (J instanceof Promise) P.push(J.then((A) => jS(A, U, S)));
                else jS(J, U, S);
            }
            if (P.length) return Promise.all(P).then(() => U);
            return U;
        });
});
function sv($, v, U) {
    if ($.issues.length) v.issues.push(...y(U, $.issues));
    v.value[U] = $.value;
}
function KS($, v, U, N) {
    if ($.issues.length)
        if (N[U] === void 0)
            if (U in N) v.value[U] = void 0;
            else v.value[U] = $.value;
        else v.issues.push(...y(U, $.issues));
    else if ($.value === void 0) {
        if (U in N) v.value[U] = void 0;
    } else v.value[U] = $.value;
}
var eI = L('$ZodObject', ($, v) => {
    w.init($, v);
    let U = Uv(() => {
        let G = Object.keys(v.shape);
        for (let z of G)
            if (!(v.shape[z] instanceof w))
                throw new Error(
                    `Invalid element at key "${z}": expected a Zod schema`,
                );
        let W = G4(v.shape);
        return {
            shape: v.shape,
            keys: G,
            keySet: new Set(G),
            numKeys: G.length,
            optionalKeys: new Set(W),
        };
    });
    F($._zod, 'propValues', () => {
        let G = v.shape,
            W = {};
        for (let z in G) {
            let B = G[z]._zod;
            if (B.values) {
                W[z] ?? (W[z] = new Set());
                for (let Y of B.values) W[z].add(Y);
            }
        }
        return W;
    });
    let N = (G) => {
            let W = new av(['shape', 'payload', 'ctx']),
                z = U.value,
                B = (b) => {
                    let u = Q$(b);
                    return `shape[${u}]._zod.run({ value: input[${u}], issues: [] }, ctx)`;
                };
            W.write('const input = payload.value;');
            let Y = Object.create(null),
                j = 0;
            for (let b of z.keys) Y[b] = `key_${j++}`;
            W.write('const newResult = {}');
            for (let b of z.keys)
                if (z.optionalKeys.has(b)) {
                    let u = Y[b];
                    W.write(`const ${u} = ${B(b)};`);
                    let E = Q$(b);
                    W.write(`
        if (${u}.issues.length) {
          if (input[${E}] === undefined) {
            if (${E} in input) {
              newResult[${E}] = undefined;
            }
          } else {
            payload.issues = payload.issues.concat(
              ${u}.issues.map((iss) => ({
                ...iss,
                path: iss.path ? [${E}, ...iss.path] : [${E}],
              }))
            );
          }
        } else if (${u}.value === undefined) {
          if (${E} in input) newResult[${E}] = undefined;
        } else {
          newResult[${E}] = ${u}.value;
        }
        `);
                } else {
                    let u = Y[b];
                    W.write(`const ${u} = ${B(b)};`),
                        W.write(`
          if (${u}.issues.length) payload.issues = payload.issues.concat(${u}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${Q$(b)}, ...iss.path] : [${Q$(b)}]
          })));`),
                        W.write(`newResult[${Q$(b)}] = ${u}.value`);
                }
            W.write('payload.value = newResult;'), W.write('return payload;');
            let K = W.compile();
            return (b, u) => K(G, b, u);
        },
        I,
        P = C$,
        S = !$v.jitless,
        J = S && L4.value,
        A = v.catchall,
        D;
    $._zod.parse = (G, W) => {
        D ?? (D = U.value);
        let z = G.value;
        if (!P(z))
            return (
                G.issues.push({
                    expected: 'object',
                    code: 'invalid_type',
                    input: z,
                    inst: $,
                }),
                G
            );
        let B = [];
        if (S && J && W?.async === !1 && W.jitless !== !0) {
            if (!I) I = N(v.shape);
            G = I(G, W);
        } else {
            G.value = {};
            let u = D.shape;
            for (let E of D.keys) {
                let U$ = u[E],
                    i = U$._zod.run({ value: z[E], issues: [] }, W),
                    R$ =
                        U$._zod.optin === 'optional' &&
                        U$._zod.optout === 'optional';
                if (i instanceof Promise)
                    B.push(
                        i.then((B$) => (R$ ? KS(B$, G, E, z) : sv(B$, G, E))),
                    );
                else if (R$) KS(i, G, E, z);
                else sv(i, G, E);
            }
        }
        if (!A) return B.length ? Promise.all(B).then(() => G) : G;
        let Y = [],
            j = D.keySet,
            K = A._zod,
            b = K.def.type;
        for (let u of Object.keys(z)) {
            if (j.has(u)) continue;
            if (b === 'never') {
                Y.push(u);
                continue;
            }
            let E = K.run({ value: z[u], issues: [] }, W);
            if (E instanceof Promise) B.push(E.then((U$) => sv(U$, G, u)));
            else sv(E, G, u);
        }
        if (Y.length)
            G.issues.push({
                code: 'unrecognized_keys',
                keys: Y,
                input: z,
                inst: $,
            });
        if (!B.length) return G;
        return Promise.all(B).then(() => {
            return G;
        });
    };
});
function wS($, v, U, N) {
    for (let I of $) if (I.issues.length === 0) return (v.value = I.value), v;
    return (
        v.issues.push({
            code: 'invalid_union',
            input: v.value,
            inst: U,
            errors: $.map((I) => I.issues.map((P) => p(P, N, r()))),
        }),
        v
    );
}
var U6 = L('$ZodUnion', ($, v) => {
        w.init($, v),
            F($._zod, 'optin', () =>
                v.options.some((U) => U._zod.optin === 'optional')
                    ? 'optional'
                    : void 0,
            ),
            F($._zod, 'optout', () =>
                v.options.some((U) => U._zod.optout === 'optional')
                    ? 'optional'
                    : void 0,
            ),
            F($._zod, 'values', () => {
                if (v.options.every((U) => U._zod.values))
                    return new Set(
                        v.options.flatMap((U) => Array.from(U._zod.values)),
                    );
                return;
            }),
            F($._zod, 'pattern', () => {
                if (v.options.every((U) => U._zod.pattern)) {
                    let U = v.options.map((N) => N._zod.pattern);
                    return new RegExp(
                        `^(${U.map((N) => Nv(N.source)).join('|')})$`,
                    );
                }
                return;
            }),
            ($._zod.parse = (U, N) => {
                let I = !1,
                    P = [];
                for (let S of v.options) {
                    let O = S._zod.run({ value: U.value, issues: [] }, N);
                    if (O instanceof Promise) P.push(O), (I = !0);
                    else {
                        if (O.issues.length === 0) return O;
                        P.push(O);
                    }
                }
                if (!I) return wS(P, U, $, N);
                return Promise.all(P).then((S) => {
                    return wS(S, U, $, N);
                });
            });
    }),
    aI = L('$ZodDiscriminatedUnion', ($, v) => {
        U6.init($, v);
        let U = $._zod.parse;
        F($._zod, 'propValues', () => {
            let I = {};
            for (let P of v.options) {
                let S = P._zod.propValues;
                if (!S || Object.keys(S).length === 0)
                    throw new Error(
                        `Invalid discriminated union option at index "${v.options.indexOf(P)}"`,
                    );
                for (let [O, J] of Object.entries(S)) {
                    if (!I[O]) I[O] = new Set();
                    for (let A of J) I[O].add(A);
                }
            }
            return I;
        });
        let N = Uv(() => {
            let I = v.options,
                P = new Map();
            for (let S of I) {
                let O = S._zod.propValues?.[v.discriminator];
                if (!O || O.size === 0)
                    throw new Error(
                        `Invalid discriminated union option at index "${v.options.indexOf(S)}"`,
                    );
                for (let J of O) {
                    if (P.has(J))
                        throw new Error(
                            `Duplicate discriminator value "${String(J)}"`,
                        );
                    P.set(J, S);
                }
            }
            return P;
        });
        $._zod.parse = (I, P) => {
            let S = I.value;
            if (!C$(S))
                return (
                    I.issues.push({
                        code: 'invalid_type',
                        expected: 'object',
                        input: S,
                        inst: $,
                    }),
                    I
                );
            let O = N.value.get(S?.[v.discriminator]);
            if (O) return O._zod.run(I, P);
            if (v.unionFallback) return U(I, P);
            return (
                I.issues.push({
                    code: 'invalid_union',
                    errors: [],
                    note: 'No matching discriminator',
                    input: S,
                    path: [v.discriminator],
                    inst: $,
                }),
                I
            );
        };
    }),
    sI = L('$ZodIntersection', ($, v) => {
        w.init($, v),
            ($._zod.parse = (U, N) => {
                let I = U.value,
                    P = v.left._zod.run({ value: I, issues: [] }, N),
                    S = v.right._zod.run({ value: I, issues: [] }, N);
                if (P instanceof Promise || S instanceof Promise)
                    return Promise.all([P, S]).then(([J, A]) => {
                        return bS(U, J, A);
                    });
                return bS(U, P, S);
            });
    });
function WI($, v) {
    if ($ === v) return { valid: !0, data: $ };
    if ($ instanceof Date && v instanceof Date && +$ === +v)
        return { valid: !0, data: $ };
    if (r$($) && r$(v)) {
        let U = Object.keys(v),
            N = Object.keys($).filter((P) => U.indexOf(P) !== -1),
            I = { ...$, ...v };
        for (let P of N) {
            let S = WI($[P], v[P]);
            if (!S.valid)
                return { valid: !1, mergeErrorPath: [P, ...S.mergeErrorPath] };
            I[P] = S.data;
        }
        return { valid: !0, data: I };
    }
    if (Array.isArray($) && Array.isArray(v)) {
        if ($.length !== v.length) return { valid: !1, mergeErrorPath: [] };
        let U = [];
        for (let N = 0; N < $.length; N++) {
            let I = $[N],
                P = v[N],
                S = WI(I, P);
            if (!S.valid)
                return { valid: !1, mergeErrorPath: [N, ...S.mergeErrorPath] };
            U.push(S.data);
        }
        return { valid: !0, data: U };
    }
    return { valid: !1, mergeErrorPath: [] };
}
function bS($, v, U) {
    if (v.issues.length) $.issues.push(...v.issues);
    if (U.issues.length) $.issues.push(...U.issues);
    if (M$($)) return $;
    let N = WI(v.value, U.value);
    if (!N.valid)
        throw new Error(
            `Unmergable intersection. Error path: ${JSON.stringify(N.mergeErrorPath)}`,
        );
    return ($.value = N.data), $;
}
var w$ = L('$ZodTuple', ($, v) => {
    w.init($, v);
    let U = v.items,
        N =
            U.length -
            [...U].reverse().findIndex((I) => I._zod.optin !== 'optional');
    $._zod.parse = (I, P) => {
        let S = I.value;
        if (!Array.isArray(S))
            return (
                I.issues.push({
                    input: S,
                    inst: $,
                    expected: 'tuple',
                    code: 'invalid_type',
                }),
                I
            );
        I.value = [];
        let O = [];
        if (!v.rest) {
            let A = S.length > U.length,
                D = S.length < N - 1;
            if (A || D)
                return (
                    I.issues.push({
                        input: S,
                        inst: $,
                        origin: 'array',
                        ...(A
                            ? { code: 'too_big', maximum: U.length }
                            : { code: 'too_small', minimum: U.length }),
                    }),
                    I
                );
        }
        let J = -1;
        for (let A of U) {
            if ((J++, J >= S.length)) {
                if (J >= N) continue;
            }
            let D = A._zod.run({ value: S[J], issues: [] }, P);
            if (D instanceof Promise) O.push(D.then((G) => $6(G, I, J)));
            else $6(D, I, J);
        }
        if (v.rest) {
            let A = S.slice(U.length);
            for (let D of A) {
                J++;
                let G = v.rest._zod.run({ value: D, issues: [] }, P);
                if (G instanceof Promise) O.push(G.then((W) => $6(W, I, J)));
                else $6(G, I, J);
            }
        }
        if (O.length) return Promise.all(O).then(() => I);
        return I;
    };
});
function $6($, v, U) {
    if ($.issues.length) v.issues.push(...y(U, $.issues));
    v.value[U] = $.value;
}
var $U = L('$ZodRecord', ($, v) => {
        w.init($, v),
            ($._zod.parse = (U, N) => {
                let I = U.value;
                if (!r$(I))
                    return (
                        U.issues.push({
                            expected: 'record',
                            code: 'invalid_type',
                            input: I,
                            inst: $,
                        }),
                        U
                    );
                let P = [];
                if (v.keyType._zod.values) {
                    let S = v.keyType._zod.values;
                    U.value = {};
                    for (let J of S)
                        if (
                            typeof J === 'string' ||
                            typeof J === 'number' ||
                            typeof J === 'symbol'
                        ) {
                            let A = v.valueType._zod.run(
                                { value: I[J], issues: [] },
                                N,
                            );
                            if (A instanceof Promise)
                                P.push(
                                    A.then((D) => {
                                        if (D.issues.length)
                                            U.issues.push(...y(J, D.issues));
                                        U.value[J] = D.value;
                                    }),
                                );
                            else {
                                if (A.issues.length)
                                    U.issues.push(...y(J, A.issues));
                                U.value[J] = A.value;
                            }
                        }
                    let O;
                    for (let J in I) if (!S.has(J)) (O = O ?? []), O.push(J);
                    if (O && O.length > 0)
                        U.issues.push({
                            code: 'unrecognized_keys',
                            input: I,
                            inst: $,
                            keys: O,
                        });
                } else {
                    U.value = {};
                    for (let S of Reflect.ownKeys(I)) {
                        if (S === '__proto__') continue;
                        let O = v.keyType._zod.run({ value: S, issues: [] }, N);
                        if (O instanceof Promise)
                            throw new Error(
                                'Async schemas not supported in object keys currently',
                            );
                        if (O.issues.length) {
                            U.issues.push({
                                origin: 'record',
                                code: 'invalid_key',
                                issues: O.issues.map((A) => p(A, N, r())),
                                input: S,
                                path: [S],
                                inst: $,
                            }),
                                (U.value[O.value] = O.value);
                            continue;
                        }
                        let J = v.valueType._zod.run(
                            { value: I[S], issues: [] },
                            N,
                        );
                        if (J instanceof Promise)
                            P.push(
                                J.then((A) => {
                                    if (A.issues.length)
                                        U.issues.push(...y(S, A.issues));
                                    U.value[O.value] = A.value;
                                }),
                            );
                        else {
                            if (J.issues.length)
                                U.issues.push(...y(S, J.issues));
                            U.value[O.value] = J.value;
                        }
                    }
                }
                if (P.length) return Promise.all(P).then(() => U);
                return U;
            });
    }),
    vU = L('$ZodMap', ($, v) => {
        w.init($, v),
            ($._zod.parse = (U, N) => {
                let I = U.value;
                if (!(I instanceof Map))
                    return (
                        U.issues.push({
                            expected: 'map',
                            code: 'invalid_type',
                            input: I,
                            inst: $,
                        }),
                        U
                    );
                let P = [];
                U.value = new Map();
                for (let [S, O] of I) {
                    let J = v.keyType._zod.run({ value: S, issues: [] }, N),
                        A = v.valueType._zod.run({ value: O, issues: [] }, N);
                    if (J instanceof Promise || A instanceof Promise)
                        P.push(
                            Promise.all([J, A]).then(([D, G]) => {
                                uS(D, G, U, S, I, $, N);
                            }),
                        );
                    else uS(J, A, U, S, I, $, N);
                }
                if (P.length) return Promise.all(P).then(() => U);
                return U;
            });
    });
function uS($, v, U, N, I, P, S) {
    if ($.issues.length)
        if (Pv.has(typeof N)) U.issues.push(...y(N, $.issues));
        else
            U.issues.push({
                origin: 'map',
                code: 'invalid_key',
                input: I,
                inst: P,
                issues: $.issues.map((O) => p(O, S, r())),
            });
    if (v.issues.length)
        if (Pv.has(typeof N)) U.issues.push(...y(N, v.issues));
        else
            U.issues.push({
                origin: 'map',
                code: 'invalid_element',
                input: I,
                inst: P,
                key: N,
                issues: v.issues.map((O) => p(O, S, r())),
            });
    U.value.set($.value, v.value);
}
var IU = L('$ZodSet', ($, v) => {
    w.init($, v),
        ($._zod.parse = (U, N) => {
            let I = U.value;
            if (!(I instanceof Set))
                return (
                    U.issues.push({
                        input: I,
                        inst: $,
                        expected: 'set',
                        code: 'invalid_type',
                    }),
                    U
                );
            let P = [];
            U.value = new Set();
            for (let S of I) {
                let O = v.valueType._zod.run({ value: S, issues: [] }, N);
                if (O instanceof Promise) P.push(O.then((J) => cS(J, U)));
                else cS(O, U);
            }
            if (P.length) return Promise.all(P).then(() => U);
            return U;
        });
});
function cS($, v) {
    if ($.issues.length) v.issues.push(...$.issues);
    v.value.add($.value);
}
var UU = L('$ZodEnum', ($, v) => {
        w.init($, v);
        let U = Iv(v.entries);
        ($._zod.values = new Set(U)),
            ($._zod.pattern = new RegExp(
                `^(${U.filter((N) => Pv.has(typeof N))
                    .map((N) => (typeof N === 'string' ? P$(N) : N.toString()))
                    .join('|')})$`,
            )),
            ($._zod.parse = (N, I) => {
                let P = N.value;
                if ($._zod.values.has(P)) return N;
                return (
                    N.issues.push({
                        code: 'invalid_value',
                        values: U,
                        input: P,
                        inst: $,
                    }),
                    N
                );
            });
    }),
    NU = L('$ZodLiteral', ($, v) => {
        w.init($, v),
            ($._zod.values = new Set(v.values)),
            ($._zod.pattern = new RegExp(
                `^(${v.values.map((U) => (typeof U === 'string' ? P$(U) : U ? U.toString() : String(U))).join('|')})$`,
            )),
            ($._zod.parse = (U, N) => {
                let I = U.value;
                if ($._zod.values.has(I)) return U;
                return (
                    U.issues.push({
                        code: 'invalid_value',
                        values: v.values,
                        input: I,
                        inst: $,
                    }),
                    U
                );
            });
    }),
    PU = L('$ZodFile', ($, v) => {
        w.init($, v),
            ($._zod.parse = (U, N) => {
                let I = U.value;
                if (I instanceof File) return U;
                return (
                    U.issues.push({
                        expected: 'file',
                        code: 'invalid_type',
                        input: I,
                        inst: $,
                    }),
                    U
                );
            });
    }),
    Vv = L('$ZodTransform', ($, v) => {
        w.init($, v),
            ($._zod.parse = (U, N) => {
                let I = v.transform(U.value, U);
                if (N.async)
                    return (I instanceof Promise ? I : Promise.resolve(I)).then(
                        (S) => {
                            return (U.value = S), U;
                        },
                    );
                if (I instanceof Promise) throw new N$();
                return (U.value = I), U;
            });
    }),
    SU = L('$ZodOptional', ($, v) => {
        w.init($, v),
            ($._zod.optin = 'optional'),
            ($._zod.optout = 'optional'),
            F($._zod, 'values', () => {
                return v.innerType._zod.values
                    ? new Set([...v.innerType._zod.values, void 0])
                    : void 0;
            }),
            F($._zod, 'pattern', () => {
                let U = v.innerType._zod.pattern;
                return U ? new RegExp(`^(${Nv(U.source)})?$`) : void 0;
            }),
            ($._zod.parse = (U, N) => {
                if (v.innerType._zod.optin === 'optional')
                    return v.innerType._zod.run(U, N);
                if (U.value === void 0) return U;
                return v.innerType._zod.run(U, N);
            });
    }),
    OU = L('$ZodNullable', ($, v) => {
        w.init($, v),
            F($._zod, 'optin', () => v.innerType._zod.optin),
            F($._zod, 'optout', () => v.innerType._zod.optout),
            F($._zod, 'pattern', () => {
                let U = v.innerType._zod.pattern;
                return U ? new RegExp(`^(${Nv(U.source)}|null)$`) : void 0;
            }),
            F($._zod, 'values', () => {
                return v.innerType._zod.values
                    ? new Set([...v.innerType._zod.values, null])
                    : void 0;
            }),
            ($._zod.parse = (U, N) => {
                if (U.value === null) return U;
                return v.innerType._zod.run(U, N);
            });
    }),
    zU = L('$ZodDefault', ($, v) => {
        w.init($, v),
            ($._zod.optin = 'optional'),
            F($._zod, 'values', () => v.innerType._zod.values),
            ($._zod.parse = (U, N) => {
                if (U.value === void 0) return (U.value = v.defaultValue), U;
                let I = v.innerType._zod.run(U, N);
                if (I instanceof Promise) return I.then((P) => FS(P, v));
                return FS(I, v);
            });
    });
function FS($, v) {
    if ($.value === void 0) $.value = v.defaultValue;
    return $;
}
var DU = L('$ZodPrefault', ($, v) => {
        w.init($, v),
            ($._zod.optin = 'optional'),
            F($._zod, 'values', () => v.innerType._zod.values),
            ($._zod.parse = (U, N) => {
                if (U.value === void 0) U.value = v.defaultValue;
                return v.innerType._zod.run(U, N);
            });
    }),
    JU = L('$ZodNonOptional', ($, v) => {
        w.init($, v),
            F($._zod, 'values', () => {
                let U = v.innerType._zod.values;
                return U ? new Set([...U].filter((N) => N !== void 0)) : void 0;
            }),
            ($._zod.parse = (U, N) => {
                let I = v.innerType._zod.run(U, N);
                if (I instanceof Promise) return I.then((P) => ES(P, $));
                return ES(I, $);
            });
    });
function ES($, v) {
    if (!$.issues.length && $.value === void 0)
        $.issues.push({
            code: 'invalid_type',
            expected: 'nonoptional',
            input: $.value,
            inst: v,
        });
    return $;
}
var AU = L('$ZodSuccess', ($, v) => {
        w.init($, v),
            ($._zod.parse = (U, N) => {
                let I = v.innerType._zod.run(U, N);
                if (I instanceof Promise)
                    return I.then((P) => {
                        return (U.value = P.issues.length === 0), U;
                    });
                return (U.value = I.issues.length === 0), U;
            });
    }),
    LU = L('$ZodCatch', ($, v) => {
        w.init($, v),
            ($._zod.optin = 'optional'),
            F($._zod, 'optout', () => v.innerType._zod.optout),
            F($._zod, 'values', () => v.innerType._zod.values),
            ($._zod.parse = (U, N) => {
                let I = v.innerType._zod.run(U, N);
                if (I instanceof Promise)
                    return I.then((P) => {
                        if (((U.value = P.value), P.issues.length))
                            (U.value = v.catchValue({
                                ...U,
                                error: {
                                    issues: P.issues.map((S) => p(S, N, r())),
                                },
                                input: U.value,
                            })),
                                (U.issues = []);
                        return U;
                    });
                if (((U.value = I.value), I.issues.length))
                    (U.value = v.catchValue({
                        ...U,
                        error: { issues: I.issues.map((P) => p(P, N, r())) },
                        input: U.value,
                    })),
                        (U.issues = []);
                return U;
            });
    }),
    VU = L('$ZodNaN', ($, v) => {
        w.init($, v),
            ($._zod.parse = (U, N) => {
                if (typeof U.value !== 'number' || !Number.isNaN(U.value))
                    return (
                        U.issues.push({
                            input: U.value,
                            inst: $,
                            expected: 'nan',
                            code: 'invalid_type',
                        }),
                        U
                    );
                return U;
            });
    }),
    Gv = L('$ZodPipe', ($, v) => {
        w.init($, v),
            F($._zod, 'values', () => v.in._zod.values),
            F($._zod, 'optin', () => v.in._zod.optin),
            F($._zod, 'optout', () => v.out._zod.optout),
            F($._zod, 'propValues', () => v.in._zod.propValues),
            ($._zod.parse = (U, N) => {
                let I = v.in._zod.run(U, N);
                if (I instanceof Promise) return I.then((P) => qS(P, v, N));
                return qS(I, v, N);
            });
    });
function qS($, v, U) {
    if (M$($)) return $;
    return v.out._zod.run({ value: $.value, issues: $.issues }, U);
}
var GU = L('$ZodReadonly', ($, v) => {
    w.init($, v),
        F($._zod, 'propValues', () => v.innerType._zod.propValues),
        F($._zod, 'values', () => v.innerType._zod.values),
        F($._zod, 'optin', () => v.innerType._zod.optin),
        F($._zod, 'optout', () => v.innerType._zod.optout),
        ($._zod.parse = (U, N) => {
            let I = v.innerType._zod.run(U, N);
            if (I instanceof Promise) return I.then(kS);
            return kS(I);
        });
});
function kS($) {
    return ($.value = Object.freeze($.value)), $;
}
var XU = L('$ZodTemplateLiteral', ($, v) => {
        w.init($, v);
        let U = [];
        for (let N of v.parts)
            if (N instanceof w) {
                if (!N._zod.pattern)
                    throw new Error(
                        `Invalid template literal part, no pattern found: ${[...N._zod.traits].shift()}`,
                    );
                let I =
                    N._zod.pattern instanceof RegExp
                        ? N._zod.pattern.source
                        : N._zod.pattern;
                if (!I)
                    throw new Error(
                        `Invalid template literal part: ${N._zod.traits}`,
                    );
                let P = I.startsWith('^') ? 1 : 0,
                    S = I.endsWith('$') ? I.length - 1 : I.length;
                U.push(I.slice(P, S));
            } else if (N === null || V4.has(typeof N)) U.push(P$(`${N}`));
            else throw new Error(`Invalid template literal part: ${N}`);
        ($._zod.pattern = new RegExp(`^${U.join('')}$`)),
            ($._zod.parse = (N, I) => {
                if (typeof N.value !== 'string')
                    return (
                        N.issues.push({
                            input: N.value,
                            inst: $,
                            expected: 'template_literal',
                            code: 'invalid_type',
                        }),
                        N
                    );
                if (
                    (($._zod.pattern.lastIndex = 0),
                    !$._zod.pattern.test(N.value))
                )
                    return (
                        N.issues.push({
                            input: N.value,
                            inst: $,
                            code: 'invalid_format',
                            format: v.format ?? 'template_literal',
                            pattern: $._zod.pattern.source,
                        }),
                        N
                    );
                return N;
            });
    }),
    WU = L('$ZodPromise', ($, v) => {
        w.init($, v),
            ($._zod.parse = (U, N) => {
                return Promise.resolve(U.value).then((I) =>
                    v.innerType._zod.run({ value: I, issues: [] }, N),
                );
            });
    }),
    BU = L('$ZodLazy', ($, v) => {
        w.init($, v),
            F($._zod, 'innerType', () => v.getter()),
            F($._zod, 'pattern', () => $._zod.innerType._zod.pattern),
            F($._zod, 'propValues', () => $._zod.innerType._zod.propValues),
            F($._zod, 'optin', () => $._zod.innerType._zod.optin),
            F($._zod, 'optout', () => $._zod.innerType._zod.optout),
            ($._zod.parse = (U, N) => {
                return $._zod.innerType._zod.run(U, N);
            });
    }),
    YU = L('$ZodCustom', ($, v) => {
        C.init($, v),
            w.init($, v),
            ($._zod.parse = (U, N) => {
                return U;
            }),
            ($._zod.check = (U) => {
                let N = U.value,
                    I = v.fn(N);
                if (I instanceof Promise) return I.then((P) => ZS(P, U, N, $));
                ZS(I, U, N, $);
                return;
            });
    });
function ZS($, v, U, N) {
    if (!$) {
        let I = {
            code: 'custom',
            input: U,
            inst: N,
            path: [...(N._zod.def.path ?? [])],
            continue: !N._zod.def.abort,
        };
        if (N._zod.def.params) I.params = N._zod.def.params;
        v.issues.push(B4(I));
    }
}
var Wv = {};
Y$(Wv, {
    zhTW: () => IN,
    zhCN: () => vN,
    vi: () => $N,
    ur: () => sU,
    ua: () => aU,
    tr: () => eU,
    th: () => dU,
    ta: () => tU,
    sv: () => iU,
    sl: () => pU,
    ru: () => lU,
    pt: () => oU,
    ps: () => hU,
    pl: () => _U,
    ota: () => yU,
    no: () => nU,
    nl: () => gU,
    ms: () => mU,
    mk: () => fU,
    ko: () => xU,
    kh: () => TU,
    ja: () => rU,
    it: () => CU,
    id: () => RU,
    hu: () => ZU,
    he: () => kU,
    frCA: () => qU,
    fr: () => EU,
    fi: () => FU,
    fa: () => cU,
    es: () => uU,
    eo: () => bU,
    en: () => Xv,
    de: () => wU,
    cs: () => KU,
    ca: () => jU,
    be: () => HU,
    az: () => MU,
    ar: () => QU,
});
var s1 = () => {
    let $ = {
        string: {
            unit: '\u062D\u0631\u0641',
            verb: '\u0623\u0646 \u064A\u062D\u0648\u064A',
        },
        file: {
            unit: '\u0628\u0627\u064A\u062A',
            verb: '\u0623\u0646 \u064A\u062D\u0648\u064A',
        },
        array: {
            unit: '\u0639\u0646\u0635\u0631',
            verb: '\u0623\u0646 \u064A\u062D\u0648\u064A',
        },
        set: {
            unit: '\u0639\u0646\u0635\u0631',
            verb: '\u0623\u0646 \u064A\u062D\u0648\u064A',
        },
    };
    function v(I) {
        return $[I] ?? null;
    }
    let U = (I) => {
            let P = typeof I;
            switch (P) {
                case 'number':
                    return Number.isNaN(I) ? 'NaN' : 'number';
                case 'object': {
                    if (Array.isArray(I)) return 'array';
                    if (I === null) return 'null';
                    if (
                        Object.getPrototypeOf(I) !== Object.prototype &&
                        I.constructor
                    )
                        return I.constructor.name;
                }
            }
            return P;
        },
        N = {
            regex: '\u0645\u062F\u062E\u0644',
            email: '\u0628\u0631\u064A\u062F \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A',
            url: '\u0631\u0627\u0628\u0637',
            emoji: '\u0625\u064A\u0645\u0648\u062C\u064A',
            uuid: 'UUID',
            uuidv4: 'UUIDv4',
            uuidv6: 'UUIDv6',
            nanoid: 'nanoid',
            guid: 'GUID',
            cuid: 'cuid',
            cuid2: 'cuid2',
            ulid: 'ULID',
            xid: 'XID',
            ksuid: 'KSUID',
            datetime:
                '\u062A\u0627\u0631\u064A\u062E \u0648\u0648\u0642\u062A \u0628\u0645\u0639\u064A\u0627\u0631 ISO',
            date: '\u062A\u0627\u0631\u064A\u062E \u0628\u0645\u0639\u064A\u0627\u0631 ISO',
            time: '\u0648\u0642\u062A \u0628\u0645\u0639\u064A\u0627\u0631 ISO',
            duration:
                '\u0645\u062F\u0629 \u0628\u0645\u0639\u064A\u0627\u0631 ISO',
            ipv4: '\u0639\u0646\u0648\u0627\u0646 IPv4',
            ipv6: '\u0639\u0646\u0648\u0627\u0646 IPv6',
            cidrv4: '\u0645\u062F\u0649 \u0639\u0646\u0627\u0648\u064A\u0646 \u0628\u0635\u064A\u063A\u0629 IPv4',
            cidrv6: '\u0645\u062F\u0649 \u0639\u0646\u0627\u0648\u064A\u0646 \u0628\u0635\u064A\u063A\u0629 IPv6',
            base64: '\u0646\u064E\u0635 \u0628\u062A\u0631\u0645\u064A\u0632 base64-encoded',
            base64url:
                '\u0646\u064E\u0635 \u0628\u062A\u0631\u0645\u064A\u0632 base64url-encoded',
            json_string:
                '\u0646\u064E\u0635 \u0639\u0644\u0649 \u0647\u064A\u0626\u0629 JSON',
            e164: '\u0631\u0642\u0645 \u0647\u0627\u062A\u0641 \u0628\u0645\u0639\u064A\u0627\u0631 E.164',
            jwt: 'JWT',
            template_literal: '\u0645\u062F\u062E\u0644',
        };
    return (I) => {
        switch (I.code) {
            case 'invalid_type':
                return `\u0645\u062F\u062E\u0644\u0627\u062A \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644\u0629: \u064A\u0641\u062A\u0631\u0636 \u0625\u062F\u062E\u0627\u0644 ${I.expected}\u060C \u0648\u0644\u0643\u0646 \u062A\u0645 \u0625\u062F\u062E\u0627\u0644 ${U(I.input)}`;
            case 'invalid_value':
                if (I.values.length === 1)
                    return `\u0645\u062F\u062E\u0644\u0627\u062A \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644\u0629: \u064A\u0641\u062A\u0631\u0636 \u0625\u062F\u062E\u0627\u0644 ${M(I.values[0])}`;
                return `\u0627\u062E\u062A\u064A\u0627\u0631 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062A\u0648\u0642\u0639 \u0627\u0646\u062A\u0642\u0627\u0621 \u0623\u062D\u062F \u0647\u0630\u0647 \u0627\u0644\u062E\u064A\u0627\u0631\u0627\u062A: ${X(I.values, '|')}`;
            case 'too_big': {
                let P = I.inclusive ? '<=' : '<',
                    S = v(I.origin);
                if (S)
                    return ` \u0623\u0643\u0628\u0631 \u0645\u0646 \u0627\u0644\u0644\u0627\u0632\u0645: \u064A\u0641\u062A\u0631\u0636 \u0623\u0646 \u062A\u0643\u0648\u0646 ${I.origin ?? '\u0627\u0644\u0642\u064A\u0645\u0629'} ${P} ${I.maximum.toString()} ${S.unit ?? '\u0639\u0646\u0635\u0631'}`;
                return `\u0623\u0643\u0628\u0631 \u0645\u0646 \u0627\u0644\u0644\u0627\u0632\u0645: \u064A\u0641\u062A\u0631\u0636 \u0623\u0646 \u062A\u0643\u0648\u0646 ${I.origin ?? '\u0627\u0644\u0642\u064A\u0645\u0629'} ${P} ${I.maximum.toString()}`;
            }
            case 'too_small': {
                let P = I.inclusive ? '>=' : '>',
                    S = v(I.origin);
                if (S)
                    return `\u0623\u0635\u063A\u0631 \u0645\u0646 \u0627\u0644\u0644\u0627\u0632\u0645: \u064A\u0641\u062A\u0631\u0636 \u0644\u0640 ${I.origin} \u0623\u0646 \u064A\u0643\u0648\u0646 ${P} ${I.minimum.toString()} ${S.unit}`;
                return `\u0623\u0635\u063A\u0631 \u0645\u0646 \u0627\u0644\u0644\u0627\u0632\u0645: \u064A\u0641\u062A\u0631\u0636 \u0644\u0640 ${I.origin} \u0623\u0646 \u064A\u0643\u0648\u0646 ${P} ${I.minimum.toString()}`;
            }
            case 'invalid_format': {
                let P = I;
                if (P.format === 'starts_with')
                    return `\u0646\u064E\u0635 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0628\u062F\u0623 \u0628\u0640 "${I.prefix}"`;
                if (P.format === 'ends_with')
                    return `\u0646\u064E\u0635 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0646\u062A\u0647\u064A \u0628\u0640 "${P.suffix}"`;
                if (P.format === 'includes')
                    return `\u0646\u064E\u0635 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u062A\u0636\u0645\u0651\u064E\u0646 "${P.includes}"`;
                if (P.format === 'regex')
                    return `\u0646\u064E\u0635 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0637\u0627\u0628\u0642 \u0627\u0644\u0646\u0645\u0637 ${P.pattern}`;
                return `${N[P.format] ?? I.format} \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644`;
            }
            case 'not_multiple_of':
                return `\u0631\u0642\u0645 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u0645\u0646 \u0645\u0636\u0627\u0639\u0641\u0627\u062A ${I.divisor}`;
            case 'unrecognized_keys':
                return `\u0645\u0639\u0631\u0641${I.keys.length > 1 ? '\u0627\u062A' : ''} \u063A\u0631\u064A\u0628${I.keys.length > 1 ? '\u0629' : ''}: ${X(I.keys, '\u060C ')}`;
            case 'invalid_key':
                return `\u0645\u0639\u0631\u0641 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644 \u0641\u064A ${I.origin}`;
            case 'invalid_union':
                return '\u0645\u062F\u062E\u0644 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644';
            case 'invalid_element':
                return `\u0645\u062F\u062E\u0644 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644 \u0641\u064A ${I.origin}`;
            default:
                return '\u0645\u062F\u062E\u0644 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644';
        }
    };
};
function QU() {
    return { localeError: s1() };
}
var $D = () => {
    let $ = {
        string: { unit: 'simvol', verb: 'olmal\u0131d\u0131r' },
        file: { unit: 'bayt', verb: 'olmal\u0131d\u0131r' },
        array: { unit: 'element', verb: 'olmal\u0131d\u0131r' },
        set: { unit: 'element', verb: 'olmal\u0131d\u0131r' },
    };
    function v(I) {
        return $[I] ?? null;
    }
    let U = (I) => {
            let P = typeof I;
            switch (P) {
                case 'number':
                    return Number.isNaN(I) ? 'NaN' : 'number';
                case 'object': {
                    if (Array.isArray(I)) return 'array';
                    if (I === null) return 'null';
                    if (
                        Object.getPrototypeOf(I) !== Object.prototype &&
                        I.constructor
                    )
                        return I.constructor.name;
                }
            }
            return P;
        },
        N = {
            regex: 'input',
            email: 'email address',
            url: 'URL',
            emoji: 'emoji',
            uuid: 'UUID',
            uuidv4: 'UUIDv4',
            uuidv6: 'UUIDv6',
            nanoid: 'nanoid',
            guid: 'GUID',
            cuid: 'cuid',
            cuid2: 'cuid2',
            ulid: 'ULID',
            xid: 'XID',
            ksuid: 'KSUID',
            datetime: 'ISO datetime',
            date: 'ISO date',
            time: 'ISO time',
            duration: 'ISO duration',
            ipv4: 'IPv4 address',
            ipv6: 'IPv6 address',
            cidrv4: 'IPv4 range',
            cidrv6: 'IPv6 range',
            base64: 'base64-encoded string',
            base64url: 'base64url-encoded string',
            json_string: 'JSON string',
            e164: 'E.164 number',
            jwt: 'JWT',
            template_literal: 'input',
        };
    return (I) => {
        switch (I.code) {
            case 'invalid_type':
                return `Yanl\u0131\u015F d\u0259y\u0259r: g\xF6zl\u0259nil\u0259n ${I.expected}, daxil olan ${U(I.input)}`;
            case 'invalid_value':
                if (I.values.length === 1)
                    return `Yanl\u0131\u015F d\u0259y\u0259r: g\xF6zl\u0259nil\u0259n ${M(I.values[0])}`;
                return `Yanl\u0131\u015F se\xE7im: a\u015Fa\u011F\u0131dak\u0131lardan biri olmal\u0131d\u0131r: ${X(I.values, '|')}`;
            case 'too_big': {
                let P = I.inclusive ? '<=' : '<',
                    S = v(I.origin);
                if (S)
                    return `\xC7ox b\xF6y\xFCk: g\xF6zl\u0259nil\u0259n ${I.origin ?? 'd\u0259y\u0259r'} ${P}${I.maximum.toString()} ${S.unit ?? 'element'}`;
                return `\xC7ox b\xF6y\xFCk: g\xF6zl\u0259nil\u0259n ${I.origin ?? 'd\u0259y\u0259r'} ${P}${I.maximum.toString()}`;
            }
            case 'too_small': {
                let P = I.inclusive ? '>=' : '>',
                    S = v(I.origin);
                if (S)
                    return `\xC7ox ki\xE7ik: g\xF6zl\u0259nil\u0259n ${I.origin} ${P}${I.minimum.toString()} ${S.unit}`;
                return `\xC7ox ki\xE7ik: g\xF6zl\u0259nil\u0259n ${I.origin} ${P}${I.minimum.toString()}`;
            }
            case 'invalid_format': {
                let P = I;
                if (P.format === 'starts_with')
                    return `Yanl\u0131\u015F m\u0259tn: "${P.prefix}" il\u0259 ba\u015Flamal\u0131d\u0131r`;
                if (P.format === 'ends_with')
                    return `Yanl\u0131\u015F m\u0259tn: "${P.suffix}" il\u0259 bitm\u0259lidir`;
                if (P.format === 'includes')
                    return `Yanl\u0131\u015F m\u0259tn: "${P.includes}" daxil olmal\u0131d\u0131r`;
                if (P.format === 'regex')
                    return `Yanl\u0131\u015F m\u0259tn: ${P.pattern} \u015Fablonuna uy\u011Fun olmal\u0131d\u0131r`;
                return `Yanl\u0131\u015F ${N[P.format] ?? I.format}`;
            }
            case 'not_multiple_of':
                return `Yanl\u0131\u015F \u0259d\u0259d: ${I.divisor} il\u0259 b\xF6l\xFCn\u0259 bil\u0259n olmal\u0131d\u0131r`;
            case 'unrecognized_keys':
                return `Tan\u0131nmayan a\xE7ar${I.keys.length > 1 ? 'lar' : ''}: ${X(I.keys, ', ')}`;
            case 'invalid_key':
                return `${I.origin} daxilind\u0259 yanl\u0131\u015F a\xE7ar`;
            case 'invalid_union':
                return 'Yanl\u0131\u015F d\u0259y\u0259r';
            case 'invalid_element':
                return `${I.origin} daxilind\u0259 yanl\u0131\u015F d\u0259y\u0259r`;
            default:
                return 'Yanl\u0131\u015F d\u0259y\u0259r';
        }
    };
};
function MU() {
    return { localeError: $D() };
}
function TS($, v, U, N) {
    let I = Math.abs($),
        P = I % 10,
        S = I % 100;
    if (S >= 11 && S <= 19) return N;
    if (P === 1) return v;
    if (P >= 2 && P <= 4) return U;
    return N;
}
var vD = () => {
    let $ = {
        string: {
            unit: {
                one: '\u0441\u0456\u043C\u0432\u0430\u043B',
                few: '\u0441\u0456\u043C\u0432\u0430\u043B\u044B',
                many: '\u0441\u0456\u043C\u0432\u0430\u043B\u0430\u045E',
            },
            verb: '\u043C\u0435\u0446\u044C',
        },
        array: {
            unit: {
                one: '\u044D\u043B\u0435\u043C\u0435\u043D\u0442',
                few: '\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u044B',
                many: '\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430\u045E',
            },
            verb: '\u043C\u0435\u0446\u044C',
        },
        set: {
            unit: {
                one: '\u044D\u043B\u0435\u043C\u0435\u043D\u0442',
                few: '\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u044B',
                many: '\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430\u045E',
            },
            verb: '\u043C\u0435\u0446\u044C',
        },
        file: {
            unit: {
                one: '\u0431\u0430\u0439\u0442',
                few: '\u0431\u0430\u0439\u0442\u044B',
                many: '\u0431\u0430\u0439\u0442\u0430\u045E',
            },
            verb: '\u043C\u0435\u0446\u044C',
        },
    };
    function v(I) {
        return $[I] ?? null;
    }
    let U = (I) => {
            let P = typeof I;
            switch (P) {
                case 'number':
                    return Number.isNaN(I) ? 'NaN' : '\u043B\u0456\u043A';
                case 'object': {
                    if (Array.isArray(I))
                        return '\u043C\u0430\u0441\u0456\u045E';
                    if (I === null) return 'null';
                    if (
                        Object.getPrototypeOf(I) !== Object.prototype &&
                        I.constructor
                    )
                        return I.constructor.name;
                }
            }
            return P;
        },
        N = {
            regex: '\u0443\u0432\u043E\u0434',
            email: 'email \u0430\u0434\u0440\u0430\u0441',
            url: 'URL',
            emoji: '\u044D\u043C\u043E\u0434\u0437\u0456',
            uuid: 'UUID',
            uuidv4: 'UUIDv4',
            uuidv6: 'UUIDv6',
            nanoid: 'nanoid',
            guid: 'GUID',
            cuid: 'cuid',
            cuid2: 'cuid2',
            ulid: 'ULID',
            xid: 'XID',
            ksuid: 'KSUID',
            datetime: 'ISO \u0434\u0430\u0442\u0430 \u0456 \u0447\u0430\u0441',
            date: 'ISO \u0434\u0430\u0442\u0430',
            time: 'ISO \u0447\u0430\u0441',
            duration:
                'ISO \u043F\u0440\u0430\u0446\u044F\u0433\u043B\u0430\u0441\u0446\u044C',
            ipv4: 'IPv4 \u0430\u0434\u0440\u0430\u0441',
            ipv6: 'IPv6 \u0430\u0434\u0440\u0430\u0441',
            cidrv4: 'IPv4 \u0434\u044B\u044F\u043F\u0430\u0437\u043E\u043D',
            cidrv6: 'IPv6 \u0434\u044B\u044F\u043F\u0430\u0437\u043E\u043D',
            base64: '\u0440\u0430\u0434\u043E\u043A \u0443 \u0444\u0430\u0440\u043C\u0430\u0446\u0435 base64',
            base64url:
                '\u0440\u0430\u0434\u043E\u043A \u0443 \u0444\u0430\u0440\u043C\u0430\u0446\u0435 base64url',
            json_string: 'JSON \u0440\u0430\u0434\u043E\u043A',
            e164: '\u043D\u0443\u043C\u0430\u0440 E.164',
            jwt: 'JWT',
            template_literal: '\u0443\u0432\u043E\u0434',
        };
    return (I) => {
        switch (I.code) {
            case 'invalid_type':
                return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434: \u0447\u0430\u043A\u0430\u045E\u0441\u044F ${I.expected}, \u0430\u0442\u0440\u044B\u043C\u0430\u043D\u0430 ${U(I.input)}`;
            case 'invalid_value':
                if (I.values.length === 1)
                    return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F ${M(I.values[0])}`;
                return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0432\u0430\u0440\u044B\u044F\u043D\u0442: \u0447\u0430\u043A\u0430\u045E\u0441\u044F \u0430\u0434\u0437\u0456\u043D \u0437 ${X(I.values, '|')}`;
            case 'too_big': {
                let P = I.inclusive ? '<=' : '<',
                    S = v(I.origin);
                if (S) {
                    let O = Number(I.maximum),
                        J = TS(O, S.unit.one, S.unit.few, S.unit.many);
                    return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u0432\u044F\u043B\u0456\u043A\u0456: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${I.origin ?? '\u0437\u043D\u0430\u0447\u044D\u043D\u043D\u0435'} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 ${S.verb} ${P}${I.maximum.toString()} ${J}`;
                }
                return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u0432\u044F\u043B\u0456\u043A\u0456: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${I.origin ?? '\u0437\u043D\u0430\u0447\u044D\u043D\u043D\u0435'} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 \u0431\u044B\u0446\u044C ${P}${I.maximum.toString()}`;
            }
            case 'too_small': {
                let P = I.inclusive ? '>=' : '>',
                    S = v(I.origin);
                if (S) {
                    let O = Number(I.minimum),
                        J = TS(O, S.unit.one, S.unit.few, S.unit.many);
                    return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u043C\u0430\u043B\u044B: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${I.origin} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 ${S.verb} ${P}${I.minimum.toString()} ${J}`;
                }
                return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u043C\u0430\u043B\u044B: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${I.origin} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 \u0431\u044B\u0446\u044C ${P}${I.minimum.toString()}`;
            }
            case 'invalid_format': {
                let P = I;
                if (P.format === 'starts_with')
                    return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u043F\u0430\u0447\u044B\u043D\u0430\u0446\u0446\u0430 \u0437 "${P.prefix}"`;
                if (P.format === 'ends_with')
                    return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0437\u0430\u043A\u0430\u043D\u0447\u0432\u0430\u0446\u0446\u0430 \u043D\u0430 "${P.suffix}"`;
                if (P.format === 'includes')
                    return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0437\u043C\u044F\u0448\u0447\u0430\u0446\u044C "${P.includes}"`;
                if (P.format === 'regex')
                    return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0430\u0434\u043F\u0430\u0432\u044F\u0434\u0430\u0446\u044C \u0448\u0430\u0431\u043B\u043E\u043D\u0443 ${P.pattern}`;
                return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B ${N[P.format] ?? I.format}`;
            }
            case 'not_multiple_of':
                return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u043B\u0456\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0431\u044B\u0446\u044C \u043A\u0440\u0430\u0442\u043D\u044B\u043C ${I.divisor}`;
            case 'unrecognized_keys':
                return `\u041D\u0435\u0440\u0430\u0441\u043F\u0430\u0437\u043D\u0430\u043D\u044B ${I.keys.length > 1 ? '\u043A\u043B\u044E\u0447\u044B' : '\u043A\u043B\u044E\u0447'}: ${X(I.keys, ', ')}`;
            case 'invalid_key':
                return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u043A\u043B\u044E\u0447 \u0443 ${I.origin}`;
            case 'invalid_union':
                return '\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434';
            case 'invalid_element':
                return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u0430\u0435 \u0437\u043D\u0430\u0447\u044D\u043D\u043D\u0435 \u045E ${I.origin}`;
            default:
                return '\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434';
        }
    };
};
function HU() {
    return { localeError: vD() };
}
var ID = () => {
    let $ = {
        string: { unit: 'car\xE0cters', verb: 'contenir' },
        file: { unit: 'bytes', verb: 'contenir' },
        array: { unit: 'elements', verb: 'contenir' },
        set: { unit: 'elements', verb: 'contenir' },
    };
    function v(I) {
        return $[I] ?? null;
    }
    let U = (I) => {
            let P = typeof I;
            switch (P) {
                case 'number':
                    return Number.isNaN(I) ? 'NaN' : 'number';
                case 'object': {
                    if (Array.isArray(I)) return 'array';
                    if (I === null) return 'null';
                    if (
                        Object.getPrototypeOf(I) !== Object.prototype &&
                        I.constructor
                    )
                        return I.constructor.name;
                }
            }
            return P;
        },
        N = {
            regex: 'entrada',
            email: 'adre\xE7a electr\xF2nica',
            url: 'URL',
            emoji: 'emoji',
            uuid: 'UUID',
            uuidv4: 'UUIDv4',
            uuidv6: 'UUIDv6',
            nanoid: 'nanoid',
            guid: 'GUID',
            cuid: 'cuid',
            cuid2: 'cuid2',
            ulid: 'ULID',
            xid: 'XID',
            ksuid: 'KSUID',
            datetime: 'data i hora ISO',
            date: 'data ISO',
            time: 'hora ISO',
            duration: 'durada ISO',
            ipv4: 'adre\xE7a IPv4',
            ipv6: 'adre\xE7a IPv6',
            cidrv4: 'rang IPv4',
            cidrv6: 'rang IPv6',
            base64: 'cadena codificada en base64',
            base64url: 'cadena codificada en base64url',
            json_string: 'cadena JSON',
            e164: 'n\xFAmero E.164',
            jwt: 'JWT',
            template_literal: 'entrada',
        };
    return (I) => {
        switch (I.code) {
            case 'invalid_type':
                return `Tipus inv\xE0lid: s'esperava ${I.expected}, s'ha rebut ${U(I.input)}`;
            case 'invalid_value':
                if (I.values.length === 1)
                    return `Valor inv\xE0lid: s'esperava ${M(I.values[0])}`;
                return `Opci\xF3 inv\xE0lida: s'esperava una de ${X(I.values, ' o ')}`;
            case 'too_big': {
                let P = I.inclusive ? 'com a m\xE0xim' : 'menys de',
                    S = v(I.origin);
                if (S)
                    return `Massa gran: s'esperava que ${I.origin ?? 'el valor'} contingu\xE9s ${P} ${I.maximum.toString()} ${S.unit ?? 'elements'}`;
                return `Massa gran: s'esperava que ${I.origin ?? 'el valor'} fos ${P} ${I.maximum.toString()}`;
            }
            case 'too_small': {
                let P = I.inclusive ? 'com a m\xEDnim' : 'm\xE9s de',
                    S = v(I.origin);
                if (S)
                    return `Massa petit: s'esperava que ${I.origin} contingu\xE9s ${P} ${I.minimum.toString()} ${S.unit}`;
                return `Massa petit: s'esperava que ${I.origin} fos ${P} ${I.minimum.toString()}`;
            }
            case 'invalid_format': {
                let P = I;
                if (P.format === 'starts_with')
                    return `Format inv\xE0lid: ha de comen\xE7ar amb "${P.prefix}"`;
                if (P.format === 'ends_with')
                    return `Format inv\xE0lid: ha d'acabar amb "${P.suffix}"`;
                if (P.format === 'includes')
                    return `Format inv\xE0lid: ha d'incloure "${P.includes}"`;
                if (P.format === 'regex')
                    return `Format inv\xE0lid: ha de coincidir amb el patr\xF3 ${P.pattern}`;
                return `Format inv\xE0lid per a ${N[P.format] ?? I.format}`;
            }
            case 'not_multiple_of':
                return `N\xFAmero inv\xE0lid: ha de ser m\xFAltiple de ${I.divisor}`;
            case 'unrecognized_keys':
                return `Clau${I.keys.length > 1 ? 's' : ''} no reconeguda${I.keys.length > 1 ? 's' : ''}: ${X(I.keys, ', ')}`;
            case 'invalid_key':
                return `Clau inv\xE0lida a ${I.origin}`;
            case 'invalid_union':
                return 'Entrada inv\xE0lida';
            case 'invalid_element':
                return `Element inv\xE0lid a ${I.origin}`;
            default:
                return 'Entrada inv\xE0lida';
        }
    };
};
function jU() {
    return { localeError: ID() };
}
var UD = () => {
    let $ = {
        string: { unit: 'znak\u016F', verb: 'm\xEDt' },
        file: { unit: 'bajt\u016F', verb: 'm\xEDt' },
        array: { unit: 'prvk\u016F', verb: 'm\xEDt' },
        set: { unit: 'prvk\u016F', verb: 'm\xEDt' },
    };
    function v(I) {
        return $[I] ?? null;
    }
    let U = (I) => {
            let P = typeof I;
            switch (P) {
                case 'number':
                    return Number.isNaN(I) ? 'NaN' : '\u010D\xEDslo';
                case 'string':
                    return '\u0159et\u011Bzec';
                case 'boolean':
                    return 'boolean';
                case 'bigint':
                    return 'bigint';
                case 'function':
                    return 'funkce';
                case 'symbol':
                    return 'symbol';
                case 'undefined':
                    return 'undefined';
                case 'object': {
                    if (Array.isArray(I)) return 'pole';
                    if (I === null) return 'null';
                    if (
                        Object.getPrototypeOf(I) !== Object.prototype &&
                        I.constructor
                    )
                        return I.constructor.name;
                }
            }
            return P;
        },
        N = {
            regex: 'regul\xE1rn\xED v\xFDraz',
            email: 'e-mailov\xE1 adresa',
            url: 'URL',
            emoji: 'emoji',
            uuid: 'UUID',
            uuidv4: 'UUIDv4',
            uuidv6: 'UUIDv6',
            nanoid: 'nanoid',
            guid: 'GUID',
            cuid: 'cuid',
            cuid2: 'cuid2',
            ulid: 'ULID',
            xid: 'XID',
            ksuid: 'KSUID',
            datetime: 'datum a \u010Das ve form\xE1tu ISO',
            date: 'datum ve form\xE1tu ISO',
            time: '\u010Das ve form\xE1tu ISO',
            duration: 'doba trv\xE1n\xED ISO',
            ipv4: 'IPv4 adresa',
            ipv6: 'IPv6 adresa',
            cidrv4: 'rozsah IPv4',
            cidrv6: 'rozsah IPv6',
            base64: '\u0159et\u011Bzec zak\xF3dovan\xFD ve form\xE1tu base64',
            base64url:
                '\u0159et\u011Bzec zak\xF3dovan\xFD ve form\xE1tu base64url',
            json_string: '\u0159et\u011Bzec ve form\xE1tu JSON',
            e164: '\u010D\xEDslo E.164',
            jwt: 'JWT',
            template_literal: 'vstup',
        };
    return (I) => {
        switch (I.code) {
            case 'invalid_type':
                return `Neplatn\xFD vstup: o\u010Dek\xE1v\xE1no ${I.expected}, obdr\u017Eeno ${U(I.input)}`;
            case 'invalid_value':
                if (I.values.length === 1)
                    return `Neplatn\xFD vstup: o\u010Dek\xE1v\xE1no ${M(I.values[0])}`;
                return `Neplatn\xE1 mo\u017Enost: o\u010Dek\xE1v\xE1na jedna z hodnot ${X(I.values, '|')}`;
            case 'too_big': {
                let P = I.inclusive ? '<=' : '<',
                    S = v(I.origin);
                if (S)
                    return `Hodnota je p\u0159\xEDli\u0161 velk\xE1: ${I.origin ?? 'hodnota'} mus\xED m\xEDt ${P}${I.maximum.toString()} ${S.unit ?? 'prvk\u016F'}`;
                return `Hodnota je p\u0159\xEDli\u0161 velk\xE1: ${I.origin ?? 'hodnota'} mus\xED b\xFDt ${P}${I.maximum.toString()}`;
            }
            case 'too_small': {
                let P = I.inclusive ? '>=' : '>',
                    S = v(I.origin);
                if (S)
                    return `Hodnota je p\u0159\xEDli\u0161 mal\xE1: ${I.origin ?? 'hodnota'} mus\xED m\xEDt ${P}${I.minimum.toString()} ${S.unit ?? 'prvk\u016F'}`;
                return `Hodnota je p\u0159\xEDli\u0161 mal\xE1: ${I.origin ?? 'hodnota'} mus\xED b\xFDt ${P}${I.minimum.toString()}`;
            }
            case 'invalid_format': {
                let P = I;
                if (P.format === 'starts_with')
                    return `Neplatn\xFD \u0159et\u011Bzec: mus\xED za\u010D\xEDnat na "${P.prefix}"`;
                if (P.format === 'ends_with')
                    return `Neplatn\xFD \u0159et\u011Bzec: mus\xED kon\u010Dit na "${P.suffix}"`;
                if (P.format === 'includes')
                    return `Neplatn\xFD \u0159et\u011Bzec: mus\xED obsahovat "${P.includes}"`;
                if (P.format === 'regex')
                    return `Neplatn\xFD \u0159et\u011Bzec: mus\xED odpov\xEDdat vzoru ${P.pattern}`;
                return `Neplatn\xFD form\xE1t ${N[P.format] ?? I.format}`;
            }
            case 'not_multiple_of':
                return `Neplatn\xE9 \u010D\xEDslo: mus\xED b\xFDt n\xE1sobkem ${I.divisor}`;
            case 'unrecognized_keys':
                return `Nezn\xE1m\xE9 kl\xED\u010De: ${X(I.keys, ', ')}`;
            case 'invalid_key':
                return `Neplatn\xFD kl\xED\u010D v ${I.origin}`;
            case 'invalid_union':
                return 'Neplatn\xFD vstup';
            case 'invalid_element':
                return `Neplatn\xE1 hodnota v ${I.origin}`;
            default:
                return 'Neplatn\xFD vstup';
        }
    };
};
function KU() {
    return { localeError: UD() };
}
var ND = () => {
    let $ = {
        string: { unit: 'Zeichen', verb: 'zu haben' },
        file: { unit: 'Bytes', verb: 'zu haben' },
        array: { unit: 'Elemente', verb: 'zu haben' },
        set: { unit: 'Elemente', verb: 'zu haben' },
    };
    function v(I) {
        return $[I] ?? null;
    }
    let U = (I) => {
            let P = typeof I;
            switch (P) {
                case 'number':
                    return Number.isNaN(I) ? 'NaN' : 'Zahl';
                case 'object': {
                    if (Array.isArray(I)) return 'Array';
                    if (I === null) return 'null';
                    if (
                        Object.getPrototypeOf(I) !== Object.prototype &&
                        I.constructor
                    )
                        return I.constructor.name;
                }
            }
            return P;
        },
        N = {
            regex: 'Eingabe',
            email: 'E-Mail-Adresse',
            url: 'URL',
            emoji: 'Emoji',
            uuid: 'UUID',
            uuidv4: 'UUIDv4',
            uuidv6: 'UUIDv6',
            nanoid: 'nanoid',
            guid: 'GUID',
            cuid: 'cuid',
            cuid2: 'cuid2',
            ulid: 'ULID',
            xid: 'XID',
            ksuid: 'KSUID',
            datetime: 'ISO-Datum und -Uhrzeit',
            date: 'ISO-Datum',
            time: 'ISO-Uhrzeit',
            duration: 'ISO-Dauer',
            ipv4: 'IPv4-Adresse',
            ipv6: 'IPv6-Adresse',
            cidrv4: 'IPv4-Bereich',
            cidrv6: 'IPv6-Bereich',
            base64: 'Base64-codierter String',
            base64url: 'Base64-URL-codierter String',
            json_string: 'JSON-String',
            e164: 'E.164-Nummer',
            jwt: 'JWT',
            template_literal: 'Eingabe',
        };
    return (I) => {
        switch (I.code) {
            case 'invalid_type':
                return `Ung\xFCltige Eingabe: erwartet ${I.expected}, erhalten ${U(I.input)}`;
            case 'invalid_value':
                if (I.values.length === 1)
                    return `Ung\xFCltige Eingabe: erwartet ${M(I.values[0])}`;
                return `Ung\xFCltige Option: erwartet eine von ${X(I.values, '|')}`;
            case 'too_big': {
                let P = I.inclusive ? '<=' : '<',
                    S = v(I.origin);
                if (S)
                    return `Zu gro\xDF: erwartet, dass ${I.origin ?? 'Wert'} ${P}${I.maximum.toString()} ${S.unit ?? 'Elemente'} hat`;
                return `Zu gro\xDF: erwartet, dass ${I.origin ?? 'Wert'} ${P}${I.maximum.toString()} ist`;
            }
            case 'too_small': {
                let P = I.inclusive ? '>=' : '>',
                    S = v(I.origin);
                if (S)
                    return `Zu klein: erwartet, dass ${I.origin} ${P}${I.minimum.toString()} ${S.unit} hat`;
                return `Zu klein: erwartet, dass ${I.origin} ${P}${I.minimum.toString()} ist`;
            }
            case 'invalid_format': {
                let P = I;
                if (P.format === 'starts_with')
                    return `Ung\xFCltiger String: muss mit "${P.prefix}" beginnen`;
                if (P.format === 'ends_with')
                    return `Ung\xFCltiger String: muss mit "${P.suffix}" enden`;
                if (P.format === 'includes')
                    return `Ung\xFCltiger String: muss "${P.includes}" enthalten`;
                if (P.format === 'regex')
                    return `Ung\xFCltiger String: muss dem Muster ${P.pattern} entsprechen`;
                return `Ung\xFCltig: ${N[P.format] ?? I.format}`;
            }
            case 'not_multiple_of':
                return `Ung\xFCltige Zahl: muss ein Vielfaches von ${I.divisor} sein`;
            case 'unrecognized_keys':
                return `${I.keys.length > 1 ? 'Unbekannte Schl\xFCssel' : 'Unbekannter Schl\xFCssel'}: ${X(I.keys, ', ')}`;
            case 'invalid_key':
                return `Ung\xFCltiger Schl\xFCssel in ${I.origin}`;
            case 'invalid_union':
                return 'Ung\xFCltige Eingabe';
            case 'invalid_element':
                return `Ung\xFCltiger Wert in ${I.origin}`;
            default:
                return 'Ung\xFCltige Eingabe';
        }
    };
};
function wU() {
    return { localeError: ND() };
}
var PD = ($) => {
        let v = typeof $;
        switch (v) {
            case 'number':
                return Number.isNaN($) ? 'NaN' : 'number';
            case 'object': {
                if (Array.isArray($)) return 'array';
                if ($ === null) return 'null';
                if (
                    Object.getPrototypeOf($) !== Object.prototype &&
                    $.constructor
                )
                    return $.constructor.name;
            }
        }
        return v;
    },
    SD = () => {
        let $ = {
            string: { unit: 'characters', verb: 'to have' },
            file: { unit: 'bytes', verb: 'to have' },
            array: { unit: 'items', verb: 'to have' },
            set: { unit: 'items', verb: 'to have' },
        };
        function v(N) {
            return $[N] ?? null;
        }
        let U = {
            regex: 'input',
            email: 'email address',
            url: 'URL',
            emoji: 'emoji',
            uuid: 'UUID',
            uuidv4: 'UUIDv4',
            uuidv6: 'UUIDv6',
            nanoid: 'nanoid',
            guid: 'GUID',
            cuid: 'cuid',
            cuid2: 'cuid2',
            ulid: 'ULID',
            xid: 'XID',
            ksuid: 'KSUID',
            datetime: 'ISO datetime',
            date: 'ISO date',
            time: 'ISO time',
            duration: 'ISO duration',
            ipv4: 'IPv4 address',
            ipv6: 'IPv6 address',
            cidrv4: 'IPv4 range',
            cidrv6: 'IPv6 range',
            base64: 'base64-encoded string',
            base64url: 'base64url-encoded string',
            json_string: 'JSON string',
            e164: 'E.164 number',
            jwt: 'JWT',
            template_literal: 'input',
        };
        return (N) => {
            switch (N.code) {
                case 'invalid_type':
                    return `Invalid input: expected ${N.expected}, received ${PD(N.input)}`;
                case 'invalid_value':
                    if (N.values.length === 1)
                        return `Invalid input: expected ${M(N.values[0])}`;
                    return `Invalid option: expected one of ${X(N.values, '|')}`;
                case 'too_big': {
                    let I = N.inclusive ? '<=' : '<',
                        P = v(N.origin);
                    if (P)
                        return `Too big: expected ${N.origin ?? 'value'} to have ${I}${N.maximum.toString()} ${P.unit ?? 'elements'}`;
                    return `Too big: expected ${N.origin ?? 'value'} to be ${I}${N.maximum.toString()}`;
                }
                case 'too_small': {
                    let I = N.inclusive ? '>=' : '>',
                        P = v(N.origin);
                    if (P)
                        return `Too small: expected ${N.origin} to have ${I}${N.minimum.toString()} ${P.unit}`;
                    return `Too small: expected ${N.origin} to be ${I}${N.minimum.toString()}`;
                }
                case 'invalid_format': {
                    let I = N;
                    if (I.format === 'starts_with')
                        return `Invalid string: must start with "${I.prefix}"`;
                    if (I.format === 'ends_with')
                        return `Invalid string: must end with "${I.suffix}"`;
                    if (I.format === 'includes')
                        return `Invalid string: must include "${I.includes}"`;
                    if (I.format === 'regex')
                        return `Invalid string: must match pattern ${I.pattern}`;
                    return `Invalid ${U[I.format] ?? N.format}`;
                }
                case 'not_multiple_of':
                    return `Invalid number: must be a multiple of ${N.divisor}`;
                case 'unrecognized_keys':
                    return `Unrecognized key${N.keys.length > 1 ? 's' : ''}: ${X(N.keys, ', ')}`;
                case 'invalid_key':
                    return `Invalid key in ${N.origin}`;
                case 'invalid_union':
                    return 'Invalid input';
                case 'invalid_element':
                    return `Invalid value in ${N.origin}`;
                default:
                    return 'Invalid input';
            }
        };
    };
function Xv() {
    return { localeError: SD() };
}
var OD = ($) => {
        let v = typeof $;
        switch (v) {
            case 'number':
                return Number.isNaN($) ? 'NaN' : 'nombro';
            case 'object': {
                if (Array.isArray($)) return 'tabelo';
                if ($ === null) return 'senvalora';
                if (
                    Object.getPrototypeOf($) !== Object.prototype &&
                    $.constructor
                )
                    return $.constructor.name;
            }
        }
        return v;
    },
    zD = () => {
        let $ = {
            string: { unit: 'karaktrojn', verb: 'havi' },
            file: { unit: 'bajtojn', verb: 'havi' },
            array: { unit: 'elementojn', verb: 'havi' },
            set: { unit: 'elementojn', verb: 'havi' },
        };
        function v(N) {
            return $[N] ?? null;
        }
        let U = {
            regex: 'enigo',
            email: 'retadreso',
            url: 'URL',
            emoji: 'emo\u011Dio',
            uuid: 'UUID',
            uuidv4: 'UUIDv4',
            uuidv6: 'UUIDv6',
            nanoid: 'nanoid',
            guid: 'GUID',
            cuid: 'cuid',
            cuid2: 'cuid2',
            ulid: 'ULID',
            xid: 'XID',
            ksuid: 'KSUID',
            datetime: 'ISO-datotempo',
            date: 'ISO-dato',
            time: 'ISO-tempo',
            duration: 'ISO-da\u016Dro',
            ipv4: 'IPv4-adreso',
            ipv6: 'IPv6-adreso',
            cidrv4: 'IPv4-rango',
            cidrv6: 'IPv6-rango',
            base64: '64-ume kodita karaktraro',
            base64url: 'URL-64-ume kodita karaktraro',
            json_string: 'JSON-karaktraro',
            e164: 'E.164-nombro',
            jwt: 'JWT',
            template_literal: 'enigo',
        };
        return (N) => {
            switch (N.code) {
                case 'invalid_type':
                    return `Nevalida enigo: atendi\u011Dis ${N.expected}, ricevi\u011Dis ${OD(N.input)}`;
                case 'invalid_value':
                    if (N.values.length === 1)
                        return `Nevalida enigo: atendi\u011Dis ${M(N.values[0])}`;
                    return `Nevalida opcio: atendi\u011Dis unu el ${X(N.values, '|')}`;
                case 'too_big': {
                    let I = N.inclusive ? '<=' : '<',
                        P = v(N.origin);
                    if (P)
                        return `Tro granda: atendi\u011Dis ke ${N.origin ?? 'valoro'} havu ${I}${N.maximum.toString()} ${P.unit ?? 'elementojn'}`;
                    return `Tro granda: atendi\u011Dis ke ${N.origin ?? 'valoro'} havu ${I}${N.maximum.toString()}`;
                }
                case 'too_small': {
                    let I = N.inclusive ? '>=' : '>',
                        P = v(N.origin);
                    if (P)
                        return `Tro malgranda: atendi\u011Dis ke ${N.origin} havu ${I}${N.minimum.toString()} ${P.unit}`;
                    return `Tro malgranda: atendi\u011Dis ke ${N.origin} estu ${I}${N.minimum.toString()}`;
                }
                case 'invalid_format': {
                    let I = N;
                    if (I.format === 'starts_with')
                        return `Nevalida karaktraro: devas komenci\u011Di per "${I.prefix}"`;
                    if (I.format === 'ends_with')
                        return `Nevalida karaktraro: devas fini\u011Di per "${I.suffix}"`;
                    if (I.format === 'includes')
                        return `Nevalida karaktraro: devas inkluzivi "${I.includes}"`;
                    if (I.format === 'regex')
                        return `Nevalida karaktraro: devas kongrui kun la modelo ${I.pattern}`;
                    return `Nevalida ${U[I.format] ?? N.format}`;
                }
                case 'not_multiple_of':
                    return `Nevalida nombro: devas esti oblo de ${N.divisor}`;
                case 'unrecognized_keys':
                    return `Nekonata${N.keys.length > 1 ? 'j' : ''} \u015Dlosilo${N.keys.length > 1 ? 'j' : ''}: ${X(N.keys, ', ')}`;
                case 'invalid_key':
                    return `Nevalida \u015Dlosilo en ${N.origin}`;
                case 'invalid_union':
                    return 'Nevalida enigo';
                case 'invalid_element':
                    return `Nevalida valoro en ${N.origin}`;
                default:
                    return 'Nevalida enigo';
            }
        };
    };
function bU() {
    return { localeError: zD() };
}
var DD = () => {
    let $ = {
        string: { unit: 'caracteres', verb: 'tener' },
        file: { unit: 'bytes', verb: 'tener' },
        array: { unit: 'elementos', verb: 'tener' },
        set: { unit: 'elementos', verb: 'tener' },
    };
    function v(I) {
        return $[I] ?? null;
    }
    let U = (I) => {
            let P = typeof I;
            switch (P) {
                case 'number':
                    return Number.isNaN(I) ? 'NaN' : 'n\xFAmero';
                case 'object': {
                    if (Array.isArray(I)) return 'arreglo';
                    if (I === null) return 'nulo';
                    if (Object.getPrototypeOf(I) !== Object.prototype)
                        return I.constructor.name;
                }
            }
            return P;
        },
        N = {
            regex: 'entrada',
            email: 'direcci\xF3n de correo electr\xF3nico',
            url: 'URL',
            emoji: 'emoji',
            uuid: 'UUID',
            uuidv4: 'UUIDv4',
            uuidv6: 'UUIDv6',
            nanoid: 'nanoid',
            guid: 'GUID',
            cuid: 'cuid',
            cuid2: 'cuid2',
            ulid: 'ULID',
            xid: 'XID',
            ksuid: 'KSUID',
            datetime: 'fecha y hora ISO',
            date: 'fecha ISO',
            time: 'hora ISO',
            duration: 'duraci\xF3n ISO',
            ipv4: 'direcci\xF3n IPv4',
            ipv6: 'direcci\xF3n IPv6',
            cidrv4: 'rango IPv4',
            cidrv6: 'rango IPv6',
            base64: 'cadena codificada en base64',
            base64url: 'URL codificada en base64',
            json_string: 'cadena JSON',
            e164: 'n\xFAmero E.164',
            jwt: 'JWT',
            template_literal: 'entrada',
        };
    return (I) => {
        switch (I.code) {
            case 'invalid_type':
                return `Entrada inv\xE1lida: se esperaba ${I.expected}, recibido ${U(I.input)}`;
            case 'invalid_value':
                if (I.values.length === 1)
                    return `Entrada inv\xE1lida: se esperaba ${M(I.values[0])}`;
                return `Opci\xF3n inv\xE1lida: se esperaba una de ${X(I.values, '|')}`;
            case 'too_big': {
                let P = I.inclusive ? '<=' : '<',
                    S = v(I.origin);
                if (S)
                    return `Demasiado grande: se esperaba que ${I.origin ?? 'valor'} tuviera ${P}${I.maximum.toString()} ${S.unit ?? 'elementos'}`;
                return `Demasiado grande: se esperaba que ${I.origin ?? 'valor'} fuera ${P}${I.maximum.toString()}`;
            }
            case 'too_small': {
                let P = I.inclusive ? '>=' : '>',
                    S = v(I.origin);
                if (S)
                    return `Demasiado peque\xF1o: se esperaba que ${I.origin} tuviera ${P}${I.minimum.toString()} ${S.unit}`;
                return `Demasiado peque\xF1o: se esperaba que ${I.origin} fuera ${P}${I.minimum.toString()}`;
            }
            case 'invalid_format': {
                let P = I;
                if (P.format === 'starts_with')
                    return `Cadena inv\xE1lida: debe comenzar con "${P.prefix}"`;
                if (P.format === 'ends_with')
                    return `Cadena inv\xE1lida: debe terminar en "${P.suffix}"`;
                if (P.format === 'includes')
                    return `Cadena inv\xE1lida: debe incluir "${P.includes}"`;
                if (P.format === 'regex')
                    return `Cadena inv\xE1lida: debe coincidir con el patr\xF3n ${P.pattern}`;
                return `Inv\xE1lido ${N[P.format] ?? I.format}`;
            }
            case 'not_multiple_of':
                return `N\xFAmero inv\xE1lido: debe ser m\xFAltiplo de ${I.divisor}`;
            case 'unrecognized_keys':
                return `Llave${I.keys.length > 1 ? 's' : ''} desconocida${I.keys.length > 1 ? 's' : ''}: ${X(I.keys, ', ')}`;
            case 'invalid_key':
                return `Llave inv\xE1lida en ${I.origin}`;
            case 'invalid_union':
                return 'Entrada inv\xE1lida';
            case 'invalid_element':
                return `Valor inv\xE1lido en ${I.origin}`;
            default:
                return 'Entrada inv\xE1lida';
        }
    };
};
function uU() {
    return { localeError: DD() };
}
var JD = () => {
    let $ = {
        string: {
            unit: '\u06A9\u0627\u0631\u0627\u06A9\u062A\u0631',
            verb: '\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F',
        },
        file: {
            unit: '\u0628\u0627\u06CC\u062A',
            verb: '\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F',
        },
        array: {
            unit: '\u0622\u06CC\u062A\u0645',
            verb: '\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F',
        },
        set: {
            unit: '\u0622\u06CC\u062A\u0645',
            verb: '\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F',
        },
    };
    function v(I) {
        return $[I] ?? null;
    }
    let U = (I) => {
            let P = typeof I;
            switch (P) {
                case 'number':
                    return Number.isNaN(I) ? 'NaN' : '\u0639\u062F\u062F';
                case 'object': {
                    if (Array.isArray(I))
                        return '\u0622\u0631\u0627\u06CC\u0647';
                    if (I === null) return 'null';
                    if (
                        Object.getPrototypeOf(I) !== Object.prototype &&
                        I.constructor
                    )
                        return I.constructor.name;
                }
            }
            return P;
        },
        N = {
            regex: '\u0648\u0631\u0648\u062F\u06CC',
            email: '\u0622\u062F\u0631\u0633 \u0627\u06CC\u0645\u06CC\u0644',
            url: 'URL',
            emoji: '\u0627\u06CC\u0645\u0648\u062C\u06CC',
            uuid: 'UUID',
            uuidv4: 'UUIDv4',
            uuidv6: 'UUIDv6',
            nanoid: 'nanoid',
            guid: 'GUID',
            cuid: 'cuid',
            cuid2: 'cuid2',
            ulid: 'ULID',
            xid: 'XID',
            ksuid: 'KSUID',
            datetime:
                '\u062A\u0627\u0631\u06CC\u062E \u0648 \u0632\u0645\u0627\u0646 \u0627\u06CC\u0632\u0648',
            date: '\u062A\u0627\u0631\u06CC\u062E \u0627\u06CC\u0632\u0648',
            time: '\u0632\u0645\u0627\u0646 \u0627\u06CC\u0632\u0648',
            duration:
                '\u0645\u062F\u062A \u0632\u0645\u0627\u0646 \u0627\u06CC\u0632\u0648',
            ipv4: 'IPv4 \u0622\u062F\u0631\u0633',
            ipv6: 'IPv6 \u0622\u062F\u0631\u0633',
            cidrv4: 'IPv4 \u062F\u0627\u0645\u0646\u0647',
            cidrv6: 'IPv6 \u062F\u0627\u0645\u0646\u0647',
            base64: 'base64-encoded \u0631\u0634\u062A\u0647',
            base64url: 'base64url-encoded \u0631\u0634\u062A\u0647',
            json_string: 'JSON \u0631\u0634\u062A\u0647',
            e164: 'E.164 \u0639\u062F\u062F',
            jwt: 'JWT',
            template_literal: '\u0648\u0631\u0648\u062F\u06CC',
        };
    return (I) => {
        switch (I.code) {
            case 'invalid_type':
                return `\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0645\u06CC\u200C\u0628\u0627\u06CC\u0633\u062A ${I.expected} \u0645\u06CC\u200C\u0628\u0648\u062F\u060C ${U(I.input)} \u062F\u0631\u06CC\u0627\u0641\u062A \u0634\u062F`;
            case 'invalid_value':
                if (I.values.length === 1)
                    return `\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0645\u06CC\u200C\u0628\u0627\u06CC\u0633\u062A ${M(I.values[0])} \u0645\u06CC\u200C\u0628\u0648\u062F`;
                return `\u06AF\u0632\u06CC\u0646\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0645\u06CC\u200C\u0628\u0627\u06CC\u0633\u062A \u06CC\u06A9\u06CC \u0627\u0632 ${X(I.values, '|')} \u0645\u06CC\u200C\u0628\u0648\u062F`;
            case 'too_big': {
                let P = I.inclusive ? '<=' : '<',
                    S = v(I.origin);
                if (S)
                    return `\u062E\u06CC\u0644\u06CC \u0628\u0632\u0631\u06AF: ${I.origin ?? '\u0645\u0642\u062F\u0627\u0631'} \u0628\u0627\u06CC\u062F ${P}${I.maximum.toString()} ${S.unit ?? '\u0639\u0646\u0635\u0631'} \u0628\u0627\u0634\u062F`;
                return `\u062E\u06CC\u0644\u06CC \u0628\u0632\u0631\u06AF: ${I.origin ?? '\u0645\u0642\u062F\u0627\u0631'} \u0628\u0627\u06CC\u062F ${P}${I.maximum.toString()} \u0628\u0627\u0634\u062F`;
            }
            case 'too_small': {
                let P = I.inclusive ? '>=' : '>',
                    S = v(I.origin);
                if (S)
                    return `\u062E\u06CC\u0644\u06CC \u06A9\u0648\u0686\u06A9: ${I.origin} \u0628\u0627\u06CC\u062F ${P}${I.minimum.toString()} ${S.unit} \u0628\u0627\u0634\u062F`;
                return `\u062E\u06CC\u0644\u06CC \u06A9\u0648\u0686\u06A9: ${I.origin} \u0628\u0627\u06CC\u062F ${P}${I.minimum.toString()} \u0628\u0627\u0634\u062F`;
            }
            case 'invalid_format': {
                let P = I;
                if (P.format === 'starts_with')
                    return `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0628\u0627 "${P.prefix}" \u0634\u0631\u0648\u0639 \u0634\u0648\u062F`;
                if (P.format === 'ends_with')
                    return `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0628\u0627 "${P.suffix}" \u062A\u0645\u0627\u0645 \u0634\u0648\u062F`;
                if (P.format === 'includes')
                    return `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0634\u0627\u0645\u0644 "${P.includes}" \u0628\u0627\u0634\u062F`;
                if (P.format === 'regex')
                    return `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0628\u0627 \u0627\u0644\u06AF\u0648\u06CC ${P.pattern} \u0645\u0637\u0627\u0628\u0642\u062A \u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F`;
                return `${N[P.format] ?? I.format} \u0646\u0627\u0645\u0639\u062A\u0628\u0631`;
            }
            case 'not_multiple_of':
                return `\u0639\u062F\u062F \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0645\u0636\u0631\u0628 ${I.divisor} \u0628\u0627\u0634\u062F`;
            case 'unrecognized_keys':
                return `\u06A9\u0644\u06CC\u062F${I.keys.length > 1 ? '\u0647\u0627\u06CC' : ''} \u0646\u0627\u0634\u0646\u0627\u0633: ${X(I.keys, ', ')}`;
            case 'invalid_key':
                return `\u06A9\u0644\u06CC\u062F \u0646\u0627\u0634\u0646\u0627\u0633 \u062F\u0631 ${I.origin}`;
            case 'invalid_union':
                return '\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631';
            case 'invalid_element':
                return `\u0645\u0642\u062F\u0627\u0631 \u0646\u0627\u0645\u0639\u062A\u0628\u0631 \u062F\u0631 ${I.origin}`;
            default:
                return '\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631';
        }
    };
};
function cU() {
    return { localeError: JD() };
}
var AD = () => {
    let $ = {
        string: { unit: 'merkki\xE4', subject: 'merkkijonon' },
        file: { unit: 'tavua', subject: 'tiedoston' },
        array: { unit: 'alkiota', subject: 'listan' },
        set: { unit: 'alkiota', subject: 'joukon' },
        number: { unit: '', subject: 'luvun' },
        bigint: { unit: '', subject: 'suuren kokonaisluvun' },
        int: { unit: '', subject: 'kokonaisluvun' },
        date: { unit: '', subject: 'p\xE4iv\xE4m\xE4\xE4r\xE4n' },
    };
    function v(I) {
        return $[I] ?? null;
    }
    let U = (I) => {
            let P = typeof I;
            switch (P) {
                case 'number':
                    return Number.isNaN(I) ? 'NaN' : 'number';
                case 'object': {
                    if (Array.isArray(I)) return 'array';
                    if (I === null) return 'null';
                    if (
                        Object.getPrototypeOf(I) !== Object.prototype &&
                        I.constructor
                    )
                        return I.constructor.name;
                }
            }
            return P;
        },
        N = {
            regex: 's\xE4\xE4nn\xF6llinen lauseke',
            email: 's\xE4hk\xF6postiosoite',
            url: 'URL-osoite',
            emoji: 'emoji',
            uuid: 'UUID',
            uuidv4: 'UUIDv4',
            uuidv6: 'UUIDv6',
            nanoid: 'nanoid',
            guid: 'GUID',
            cuid: 'cuid',
            cuid2: 'cuid2',
            ulid: 'ULID',
            xid: 'XID',
            ksuid: 'KSUID',
            datetime: 'ISO-aikaleima',
            date: 'ISO-p\xE4iv\xE4m\xE4\xE4r\xE4',
            time: 'ISO-aika',
            duration: 'ISO-kesto',
            ipv4: 'IPv4-osoite',
            ipv6: 'IPv6-osoite',
            cidrv4: 'IPv4-alue',
            cidrv6: 'IPv6-alue',
            base64: 'base64-koodattu merkkijono',
            base64url: 'base64url-koodattu merkkijono',
            json_string: 'JSON-merkkijono',
            e164: 'E.164-luku',
            jwt: 'JWT',
            template_literal: 'templaattimerkkijono',
        };
    return (I) => {
        switch (I.code) {
            case 'invalid_type':
                return `Virheellinen tyyppi: odotettiin ${I.expected}, oli ${U(I.input)}`;
            case 'invalid_value':
                if (I.values.length === 1)
                    return `Virheellinen sy\xF6te: t\xE4ytyy olla ${M(I.values[0])}`;
                return `Virheellinen valinta: t\xE4ytyy olla yksi seuraavista: ${X(I.values, '|')}`;
            case 'too_big': {
                let P = I.inclusive ? '<=' : '<',
                    S = v(I.origin);
                if (S)
                    return `Liian suuri: ${S.subject} t\xE4ytyy olla ${P}${I.maximum.toString()} ${S.unit}`.trim();
                return `Liian suuri: arvon t\xE4ytyy olla ${P}${I.maximum.toString()}`;
            }
            case 'too_small': {
                let P = I.inclusive ? '>=' : '>',
                    S = v(I.origin);
                if (S)
                    return `Liian pieni: ${S.subject} t\xE4ytyy olla ${P}${I.minimum.toString()} ${S.unit}`.trim();
                return `Liian pieni: arvon t\xE4ytyy olla ${P}${I.minimum.toString()}`;
            }
            case 'invalid_format': {
                let P = I;
                if (P.format === 'starts_with')
                    return `Virheellinen sy\xF6te: t\xE4ytyy alkaa "${P.prefix}"`;
                if (P.format === 'ends_with')
                    return `Virheellinen sy\xF6te: t\xE4ytyy loppua "${P.suffix}"`;
                if (P.format === 'includes')
                    return `Virheellinen sy\xF6te: t\xE4ytyy sis\xE4lt\xE4\xE4 "${P.includes}"`;
                if (P.format === 'regex')
                    return `Virheellinen sy\xF6te: t\xE4ytyy vastata s\xE4\xE4nn\xF6llist\xE4 lauseketta ${P.pattern}`;
                return `Virheellinen ${N[P.format] ?? I.format}`;
            }
            case 'not_multiple_of':
                return `Virheellinen luku: t\xE4ytyy olla luvun ${I.divisor} monikerta`;
            case 'unrecognized_keys':
                return `${I.keys.length > 1 ? 'Tuntemattomat avaimet' : 'Tuntematon avain'}: ${X(I.keys, ', ')}`;
            case 'invalid_key':
                return 'Virheellinen avain tietueessa';
            case 'invalid_union':
                return 'Virheellinen unioni';
            case 'invalid_element':
                return 'Virheellinen arvo joukossa';
            default:
                return 'Virheellinen sy\xF6te';
        }
    };
};
function FU() {
    return { localeError: AD() };
}
var LD = () => {
    let $ = {
        string: { unit: 'caract\xE8res', verb: 'avoir' },
        file: { unit: 'octets', verb: 'avoir' },
        array: { unit: '\xE9l\xE9ments', verb: 'avoir' },
        set: { unit: '\xE9l\xE9ments', verb: 'avoir' },
    };
    function v(I) {
        return $[I] ?? null;
    }
    let U = (I) => {
            let P = typeof I;
            switch (P) {
                case 'number':
                    return Number.isNaN(I) ? 'NaN' : 'nombre';
                case 'object': {
                    if (Array.isArray(I)) return 'tableau';
                    if (I === null) return 'null';
                    if (
                        Object.getPrototypeOf(I) !== Object.prototype &&
                        I.constructor
                    )
                        return I.constructor.name;
                }
            }
            return P;
        },
        N = {
            regex: 'entr\xE9e',
            email: 'adresse e-mail',
            url: 'URL',
            emoji: 'emoji',
            uuid: 'UUID',
            uuidv4: 'UUIDv4',
            uuidv6: 'UUIDv6',
            nanoid: 'nanoid',
            guid: 'GUID',
            cuid: 'cuid',
            cuid2: 'cuid2',
            ulid: 'ULID',
            xid: 'XID',
            ksuid: 'KSUID',
            datetime: 'date et heure ISO',
            date: 'date ISO',
            time: 'heure ISO',
            duration: 'dur\xE9e ISO',
            ipv4: 'adresse IPv4',
            ipv6: 'adresse IPv6',
            cidrv4: 'plage IPv4',
            cidrv6: 'plage IPv6',
            base64: 'cha\xEEne encod\xE9e en base64',
            base64url: 'cha\xEEne encod\xE9e en base64url',
            json_string: 'cha\xEEne JSON',
            e164: 'num\xE9ro E.164',
            jwt: 'JWT',
            template_literal: 'entr\xE9e',
        };
    return (I) => {
        switch (I.code) {
            case 'invalid_type':
                return `Entr\xE9e invalide : ${I.expected} attendu, ${U(I.input)} re\xE7u`;
            case 'invalid_value':
                if (I.values.length === 1)
                    return `Entr\xE9e invalide : ${M(I.values[0])} attendu`;
                return `Option invalide : une valeur parmi ${X(I.values, '|')} attendue`;
            case 'too_big': {
                let P = I.inclusive ? '<=' : '<',
                    S = v(I.origin);
                if (S)
                    return `Trop grand : ${I.origin ?? 'valeur'} doit ${S.verb} ${P}${I.maximum.toString()} ${S.unit ?? '\xE9l\xE9ment(s)'}`;
                return `Trop grand : ${I.origin ?? 'valeur'} doit \xEAtre ${P}${I.maximum.toString()}`;
            }
            case 'too_small': {
                let P = I.inclusive ? '>=' : '>',
                    S = v(I.origin);
                if (S)
                    return `Trop petit : ${I.origin} doit ${S.verb} ${P}${I.minimum.toString()} ${S.unit}`;
                return `Trop petit : ${I.origin} doit \xEAtre ${P}${I.minimum.toString()}`;
            }
            case 'invalid_format': {
                let P = I;
                if (P.format === 'starts_with')
                    return `Cha\xEEne invalide : doit commencer par "${P.prefix}"`;
                if (P.format === 'ends_with')
                    return `Cha\xEEne invalide : doit se terminer par "${P.suffix}"`;
                if (P.format === 'includes')
                    return `Cha\xEEne invalide : doit inclure "${P.includes}"`;
                if (P.format === 'regex')
                    return `Cha\xEEne invalide : doit correspondre au mod\xE8le ${P.pattern}`;
                return `${N[P.format] ?? I.format} invalide`;
            }
            case 'not_multiple_of':
                return `Nombre invalide : doit \xEAtre un multiple de ${I.divisor}`;
            case 'unrecognized_keys':
                return `Cl\xE9${I.keys.length > 1 ? 's' : ''} non reconnue${I.keys.length > 1 ? 's' : ''} : ${X(I.keys, ', ')}`;
            case 'invalid_key':
                return `Cl\xE9 invalide dans ${I.origin}`;
            case 'invalid_union':
                return 'Entr\xE9e invalide';
            case 'invalid_element':
                return `Valeur invalide dans ${I.origin}`;
            default:
                return 'Entr\xE9e invalide';
        }
    };
};
function EU() {
    return { localeError: LD() };
}
var VD = () => {
    let $ = {
        string: { unit: 'caract\xE8res', verb: 'avoir' },
        file: { unit: 'octets', verb: 'avoir' },
        array: { unit: '\xE9l\xE9ments', verb: 'avoir' },
        set: { unit: '\xE9l\xE9ments', verb: 'avoir' },
    };
    function v(I) {
        return $[I] ?? null;
    }
    let U = (I) => {
            let P = typeof I;
            switch (P) {
                case 'number':
                    return Number.isNaN(I) ? 'NaN' : 'number';
                case 'object': {
                    if (Array.isArray(I)) return 'array';
                    if (I === null) return 'null';
                    if (
                        Object.getPrototypeOf(I) !== Object.prototype &&
                        I.constructor
                    )
                        return I.constructor.name;
                }
            }
            return P;
        },
        N = {
            regex: 'entr\xE9e',
            email: 'adresse courriel',
            url: 'URL',
            emoji: 'emoji',
            uuid: 'UUID',
            uuidv4: 'UUIDv4',
            uuidv6: 'UUIDv6',
            nanoid: 'nanoid',
            guid: 'GUID',
            cuid: 'cuid',
            cuid2: 'cuid2',
            ulid: 'ULID',
            xid: 'XID',
            ksuid: 'KSUID',
            datetime: 'date-heure ISO',
            date: 'date ISO',
            time: 'heure ISO',
            duration: 'dur\xE9e ISO',
            ipv4: 'adresse IPv4',
            ipv6: 'adresse IPv6',
            cidrv4: 'plage IPv4',
            cidrv6: 'plage IPv6',
            base64: 'cha\xEEne encod\xE9e en base64',
            base64url: 'cha\xEEne encod\xE9e en base64url',
            json_string: 'cha\xEEne JSON',
            e164: 'num\xE9ro E.164',
            jwt: 'JWT',
            template_literal: 'entr\xE9e',
        };
    return (I) => {
        switch (I.code) {
            case 'invalid_type':
                return `Entr\xE9e invalide : attendu ${I.expected}, re\xE7u ${U(I.input)}`;
            case 'invalid_value':
                if (I.values.length === 1)
                    return `Entr\xE9e invalide : attendu ${M(I.values[0])}`;
                return `Option invalide : attendu l'une des valeurs suivantes ${X(I.values, '|')}`;
            case 'too_big': {
                let P = I.inclusive ? '\u2264' : '<',
                    S = v(I.origin);
                if (S)
                    return `Trop grand : attendu que ${I.origin ?? 'la valeur'} ait ${P}${I.maximum.toString()} ${S.unit}`;
                return `Trop grand : attendu que ${I.origin ?? 'la valeur'} soit ${P}${I.maximum.toString()}`;
            }
            case 'too_small': {
                let P = I.inclusive ? '\u2265' : '>',
                    S = v(I.origin);
                if (S)
                    return `Trop petit : attendu que ${I.origin} ait ${P}${I.minimum.toString()} ${S.unit}`;
                return `Trop petit : attendu que ${I.origin} soit ${P}${I.minimum.toString()}`;
            }
            case 'invalid_format': {
                let P = I;
                if (P.format === 'starts_with')
                    return `Cha\xEEne invalide : doit commencer par "${P.prefix}"`;
                if (P.format === 'ends_with')
                    return `Cha\xEEne invalide : doit se terminer par "${P.suffix}"`;
                if (P.format === 'includes')
                    return `Cha\xEEne invalide : doit inclure "${P.includes}"`;
                if (P.format === 'regex')
                    return `Cha\xEEne invalide : doit correspondre au motif ${P.pattern}`;
                return `${N[P.format] ?? I.format} invalide`;
            }
            case 'not_multiple_of':
                return `Nombre invalide : doit \xEAtre un multiple de ${I.divisor}`;
            case 'unrecognized_keys':
                return `Cl\xE9${I.keys.length > 1 ? 's' : ''} non reconnue${I.keys.length > 1 ? 's' : ''} : ${X(I.keys, ', ')}`;
            case 'invalid_key':
                return `Cl\xE9 invalide dans ${I.origin}`;
            case 'invalid_union':
                return 'Entr\xE9e invalide';
            case 'invalid_element':
                return `Valeur invalide dans ${I.origin}`;
            default:
                return 'Entr\xE9e invalide';
        }
    };
};
function qU() {
    return { localeError: VD() };
}
var GD = () => {
    let $ = {
        string: {
            unit: '\u05D0\u05D5\u05EA\u05D9\u05D5\u05EA',
            verb: '\u05DC\u05DB\u05DC\u05D5\u05DC',
        },
        file: {
            unit: '\u05D1\u05D9\u05D9\u05D8\u05D9\u05DD',
            verb: '\u05DC\u05DB\u05DC\u05D5\u05DC',
        },
        array: {
            unit: '\u05E4\u05E8\u05D9\u05D8\u05D9\u05DD',
            verb: '\u05DC\u05DB\u05DC\u05D5\u05DC',
        },
        set: {
            unit: '\u05E4\u05E8\u05D9\u05D8\u05D9\u05DD',
            verb: '\u05DC\u05DB\u05DC\u05D5\u05DC',
        },
    };
    function v(I) {
        return $[I] ?? null;
    }
    let U = (I) => {
            let P = typeof I;
            switch (P) {
                case 'number':
                    return Number.isNaN(I) ? 'NaN' : 'number';
                case 'object': {
                    if (Array.isArray(I)) return 'array';
                    if (I === null) return 'null';
                    if (
                        Object.getPrototypeOf(I) !== Object.prototype &&
                        I.constructor
                    )
                        return I.constructor.name;
                }
            }
            return P;
        },
        N = {
            regex: '\u05E7\u05DC\u05D8',
            email: '\u05DB\u05EA\u05D5\u05D1\u05EA \u05D0\u05D9\u05DE\u05D9\u05D9\u05DC',
            url: '\u05DB\u05EA\u05D5\u05D1\u05EA \u05E8\u05E9\u05EA',
            emoji: "\u05D0\u05D9\u05DE\u05D5\u05D2'\u05D9",
            uuid: 'UUID',
            uuidv4: 'UUIDv4',
            uuidv6: 'UUIDv6',
            nanoid: 'nanoid',
            guid: 'GUID',
            cuid: 'cuid',
            cuid2: 'cuid2',
            ulid: 'ULID',
            xid: 'XID',
            ksuid: 'KSUID',
            datetime:
                '\u05EA\u05D0\u05E8\u05D9\u05DA \u05D5\u05D6\u05DE\u05DF ISO',
            date: '\u05EA\u05D0\u05E8\u05D9\u05DA ISO',
            time: '\u05D6\u05DE\u05DF ISO',
            duration: '\u05DE\u05E9\u05DA \u05D6\u05DE\u05DF ISO',
            ipv4: '\u05DB\u05EA\u05D5\u05D1\u05EA IPv4',
            ipv6: '\u05DB\u05EA\u05D5\u05D1\u05EA IPv6',
            cidrv4: '\u05D8\u05D5\u05D5\u05D7 IPv4',
            cidrv6: '\u05D8\u05D5\u05D5\u05D7 IPv6',
            base64: '\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D1\u05D1\u05E1\u05D9\u05E1 64',
            base64url:
                '\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D1\u05D1\u05E1\u05D9\u05E1 64 \u05DC\u05DB\u05EA\u05D5\u05D1\u05D5\u05EA \u05E8\u05E9\u05EA',
            json_string: '\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA JSON',
            e164: '\u05DE\u05E1\u05E4\u05E8 E.164',
            jwt: 'JWT',
            template_literal: '\u05E7\u05DC\u05D8',
        };
    return (I) => {
        switch (I.code) {
            case 'invalid_type':
                return `\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05E6\u05E8\u05D9\u05DA ${I.expected}, \u05D4\u05EA\u05E7\u05D1\u05DC ${U(I.input)}`;
            case 'invalid_value':
                if (I.values.length === 1)
                    return `\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05E6\u05E8\u05D9\u05DA ${M(I.values[0])}`;
                return `\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05E6\u05E8\u05D9\u05DA \u05D0\u05D7\u05EA \u05DE\u05D4\u05D0\u05E4\u05E9\u05E8\u05D5\u05D9\u05D5\u05EA  ${X(I.values, '|')}`;
            case 'too_big': {
                let P = I.inclusive ? '<=' : '<',
                    S = v(I.origin);
                if (S)
                    return `\u05D2\u05D3\u05D5\u05DC \u05DE\u05D3\u05D9: ${I.origin ?? 'value'} \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA ${P}${I.maximum.toString()} ${S.unit ?? 'elements'}`;
                return `\u05D2\u05D3\u05D5\u05DC \u05DE\u05D3\u05D9: ${I.origin ?? 'value'} \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA ${P}${I.maximum.toString()}`;
            }
            case 'too_small': {
                let P = I.inclusive ? '>=' : '>',
                    S = v(I.origin);
                if (S)
                    return `\u05E7\u05D8\u05DF \u05DE\u05D3\u05D9: ${I.origin} \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA ${P}${I.minimum.toString()} ${S.unit}`;
                return `\u05E7\u05D8\u05DF \u05DE\u05D3\u05D9: ${I.origin} \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA ${P}${I.minimum.toString()}`;
            }
            case 'invalid_format': {
                let P = I;
                if (P.format === 'starts_with')
                    return `\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05E0\u05D4: \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05D4\u05EA\u05D7\u05D9\u05DC \u05D1"${P.prefix}"`;
                if (P.format === 'ends_with')
                    return `\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05E0\u05D4: \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05D4\u05E1\u05EA\u05D9\u05D9\u05DD \u05D1 "${P.suffix}"`;
                if (P.format === 'includes')
                    return `\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05E0\u05D4: \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05DB\u05DC\u05D5\u05DC "${P.includes}"`;
                if (P.format === 'regex')
                    return `\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05E0\u05D4: \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05D4\u05EA\u05D0\u05D9\u05DD \u05DC\u05EA\u05D1\u05E0\u05D9\u05EA ${P.pattern}`;
                return `${N[P.format] ?? I.format} \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF`;
            }
            case 'not_multiple_of':
                return `\u05DE\u05E1\u05E4\u05E8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05D7\u05D9\u05D9\u05D1 \u05DC\u05D4\u05D9\u05D5\u05EA \u05DE\u05DB\u05E4\u05DC\u05D4 \u05E9\u05DC ${I.divisor}`;
            case 'unrecognized_keys':
                return `\u05DE\u05E4\u05EA\u05D7${I.keys.length > 1 ? '\u05D5\u05EA' : ''} \u05DC\u05D0 \u05DE\u05D6\u05D5\u05D4${I.keys.length > 1 ? '\u05D9\u05DD' : '\u05D4'}: ${X(I.keys, ', ')}`;
            case 'invalid_key':
                return `\u05DE\u05E4\u05EA\u05D7 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF \u05D1${I.origin}`;
            case 'invalid_union':
                return '\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF';
            case 'invalid_element':
                return `\u05E2\u05E8\u05DA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF \u05D1${I.origin}`;
            default:
                return '\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF';
        }
    };
};
function kU() {
    return { localeError: GD() };
}
var XD = () => {
    let $ = {
        string: { unit: 'karakter', verb: 'legyen' },
        file: { unit: 'byte', verb: 'legyen' },
        array: { unit: 'elem', verb: 'legyen' },
        set: { unit: 'elem', verb: 'legyen' },
    };
    function v(I) {
        return $[I] ?? null;
    }
    let U = (I) => {
            let P = typeof I;
            switch (P) {
                case 'number':
                    return Number.isNaN(I) ? 'NaN' : 'sz\xE1m';
                case 'object': {
                    if (Array.isArray(I)) return 't\xF6mb';
                    if (I === null) return 'null';
                    if (
                        Object.getPrototypeOf(I) !== Object.prototype &&
                        I.constructor
                    )
                        return I.constructor.name;
                }
            }
            return P;
        },
        N = {
            regex: 'bemenet',
            email: 'email c\xEDm',
            url: 'URL',
            emoji: 'emoji',
            uuid: 'UUID',
            uuidv4: 'UUIDv4',
            uuidv6: 'UUIDv6',
            nanoid: 'nanoid',
            guid: 'GUID',
            cuid: 'cuid',
            cuid2: 'cuid2',
            ulid: 'ULID',
            xid: 'XID',
            ksuid: 'KSUID',
            datetime: 'ISO id\u0151b\xE9lyeg',
            date: 'ISO d\xE1tum',
            time: 'ISO id\u0151',
            duration: 'ISO id\u0151intervallum',
            ipv4: 'IPv4 c\xEDm',
            ipv6: 'IPv6 c\xEDm',
            cidrv4: 'IPv4 tartom\xE1ny',
            cidrv6: 'IPv6 tartom\xE1ny',
            base64: 'base64-k\xF3dolt string',
            base64url: 'base64url-k\xF3dolt string',
            json_string: 'JSON string',
            e164: 'E.164 sz\xE1m',
            jwt: 'JWT',
            template_literal: 'bemenet',
        };
    return (I) => {
        switch (I.code) {
            case 'invalid_type':
                return `\xC9rv\xE9nytelen bemenet: a v\xE1rt \xE9rt\xE9k ${I.expected}, a kapott \xE9rt\xE9k ${U(I.input)}`;
            case 'invalid_value':
                if (I.values.length === 1)
                    return `\xC9rv\xE9nytelen bemenet: a v\xE1rt \xE9rt\xE9k ${M(I.values[0])}`;
                return `\xC9rv\xE9nytelen opci\xF3: valamelyik \xE9rt\xE9k v\xE1rt ${X(I.values, '|')}`;
            case 'too_big': {
                let P = I.inclusive ? '<=' : '<',
                    S = v(I.origin);
                if (S)
                    return `T\xFAl nagy: ${I.origin ?? '\xE9rt\xE9k'} m\xE9rete t\xFAl nagy ${P}${I.maximum.toString()} ${S.unit ?? 'elem'}`;
                return `T\xFAl nagy: a bemeneti \xE9rt\xE9k ${I.origin ?? '\xE9rt\xE9k'} t\xFAl nagy: ${P}${I.maximum.toString()}`;
            }
            case 'too_small': {
                let P = I.inclusive ? '>=' : '>',
                    S = v(I.origin);
                if (S)
                    return `T\xFAl kicsi: a bemeneti \xE9rt\xE9k ${I.origin} m\xE9rete t\xFAl kicsi ${P}${I.minimum.toString()} ${S.unit}`;
                return `T\xFAl kicsi: a bemeneti \xE9rt\xE9k ${I.origin} t\xFAl kicsi ${P}${I.minimum.toString()}`;
            }
            case 'invalid_format': {
                let P = I;
                if (P.format === 'starts_with')
                    return `\xC9rv\xE9nytelen string: "${P.prefix}" \xE9rt\xE9kkel kell kezd\u0151dnie`;
                if (P.format === 'ends_with')
                    return `\xC9rv\xE9nytelen string: "${P.suffix}" \xE9rt\xE9kkel kell v\xE9gz\u0151dnie`;
                if (P.format === 'includes')
                    return `\xC9rv\xE9nytelen string: "${P.includes}" \xE9rt\xE9ket kell tartalmaznia`;
                if (P.format === 'regex')
                    return `\xC9rv\xE9nytelen string: ${P.pattern} mint\xE1nak kell megfelelnie`;
                return `\xC9rv\xE9nytelen ${N[P.format] ?? I.format}`;
            }
            case 'not_multiple_of':
                return `\xC9rv\xE9nytelen sz\xE1m: ${I.divisor} t\xF6bbsz\xF6r\xF6s\xE9nek kell lennie`;
            case 'unrecognized_keys':
                return `Ismeretlen kulcs${I.keys.length > 1 ? 's' : ''}: ${X(I.keys, ', ')}`;
            case 'invalid_key':
                return `\xC9rv\xE9nytelen kulcs ${I.origin}`;
            case 'invalid_union':
                return '\xC9rv\xE9nytelen bemenet';
            case 'invalid_element':
                return `\xC9rv\xE9nytelen \xE9rt\xE9k: ${I.origin}`;
            default:
                return '\xC9rv\xE9nytelen bemenet';
        }
    };
};
function ZU() {
    return { localeError: XD() };
}
var WD = () => {
    let $ = {
        string: { unit: 'karakter', verb: 'memiliki' },
        file: { unit: 'byte', verb: 'memiliki' },
        array: { unit: 'item', verb: 'memiliki' },
        set: { unit: 'item', verb: 'memiliki' },
    };
    function v(I) {
        return $[I] ?? null;
    }
    let U = (I) => {
            let P = typeof I;
            switch (P) {
                case 'number':
                    return Number.isNaN(I) ? 'NaN' : 'number';
                case 'object': {
                    if (Array.isArray(I)) return 'array';
                    if (I === null) return 'null';
                    if (
                        Object.getPrototypeOf(I) !== Object.prototype &&
                        I.constructor
                    )
                        return I.constructor.name;
                }
            }
            return P;
        },
        N = {
            regex: 'input',
            email: 'alamat email',
            url: 'URL',
            emoji: 'emoji',
            uuid: 'UUID',
            uuidv4: 'UUIDv4',
            uuidv6: 'UUIDv6',
            nanoid: 'nanoid',
            guid: 'GUID',
            cuid: 'cuid',
            cuid2: 'cuid2',
            ulid: 'ULID',
            xid: 'XID',
            ksuid: 'KSUID',
            datetime: 'tanggal dan waktu format ISO',
            date: 'tanggal format ISO',
            time: 'jam format ISO',
            duration: 'durasi format ISO',
            ipv4: 'alamat IPv4',
            ipv6: 'alamat IPv6',
            cidrv4: 'rentang alamat IPv4',
            cidrv6: 'rentang alamat IPv6',
            base64: 'string dengan enkode base64',
            base64url: 'string dengan enkode base64url',
            json_string: 'string JSON',
            e164: 'angka E.164',
            jwt: 'JWT',
            template_literal: 'input',
        };
    return (I) => {
        switch (I.code) {
            case 'invalid_type':
                return `Input tidak valid: diharapkan ${I.expected}, diterima ${U(I.input)}`;
            case 'invalid_value':
                if (I.values.length === 1)
                    return `Input tidak valid: diharapkan ${M(I.values[0])}`;
                return `Pilihan tidak valid: diharapkan salah satu dari ${X(I.values, '|')}`;
            case 'too_big': {
                let P = I.inclusive ? '<=' : '<',
                    S = v(I.origin);
                if (S)
                    return `Terlalu besar: diharapkan ${I.origin ?? 'value'} memiliki ${P}${I.maximum.toString()} ${S.unit ?? 'elemen'}`;
                return `Terlalu besar: diharapkan ${I.origin ?? 'value'} menjadi ${P}${I.maximum.toString()}`;
            }
            case 'too_small': {
                let P = I.inclusive ? '>=' : '>',
                    S = v(I.origin);
                if (S)
                    return `Terlalu kecil: diharapkan ${I.origin} memiliki ${P}${I.minimum.toString()} ${S.unit}`;
                return `Terlalu kecil: diharapkan ${I.origin} menjadi ${P}${I.minimum.toString()}`;
            }
            case 'invalid_format': {
                let P = I;
                if (P.format === 'starts_with')
                    return `String tidak valid: harus dimulai dengan "${P.prefix}"`;
                if (P.format === 'ends_with')
                    return `String tidak valid: harus berakhir dengan "${P.suffix}"`;
                if (P.format === 'includes')
                    return `String tidak valid: harus menyertakan "${P.includes}"`;
                if (P.format === 'regex')
                    return `String tidak valid: harus sesuai pola ${P.pattern}`;
                return `${N[P.format] ?? I.format} tidak valid`;
            }
            case 'not_multiple_of':
                return `Angka tidak valid: harus kelipatan dari ${I.divisor}`;
            case 'unrecognized_keys':
                return `Kunci tidak dikenali ${I.keys.length > 1 ? 's' : ''}: ${X(I.keys, ', ')}`;
            case 'invalid_key':
                return `Kunci tidak valid di ${I.origin}`;
            case 'invalid_union':
                return 'Input tidak valid';
            case 'invalid_element':
                return `Nilai tidak valid di ${I.origin}`;
            default:
                return 'Input tidak valid';
        }
    };
};
function RU() {
    return { localeError: WD() };
}
var BD = () => {
    let $ = {
        string: { unit: 'caratteri', verb: 'avere' },
        file: { unit: 'byte', verb: 'avere' },
        array: { unit: 'elementi', verb: 'avere' },
        set: { unit: 'elementi', verb: 'avere' },
    };
    function v(I) {
        return $[I] ?? null;
    }
    let U = (I) => {
            let P = typeof I;
            switch (P) {
                case 'number':
                    return Number.isNaN(I) ? 'NaN' : 'numero';
                case 'object': {
                    if (Array.isArray(I)) return 'vettore';
                    if (I === null) return 'null';
                    if (
                        Object.getPrototypeOf(I) !== Object.prototype &&
                        I.constructor
                    )
                        return I.constructor.name;
                }
            }
            return P;
        },
        N = {
            regex: 'input',
            email: 'indirizzo email',
            url: 'URL',
            emoji: 'emoji',
            uuid: 'UUID',
            uuidv4: 'UUIDv4',
            uuidv6: 'UUIDv6',
            nanoid: 'nanoid',
            guid: 'GUID',
            cuid: 'cuid',
            cuid2: 'cuid2',
            ulid: 'ULID',
            xid: 'XID',
            ksuid: 'KSUID',
            datetime: 'data e ora ISO',
            date: 'data ISO',
            time: 'ora ISO',
            duration: 'durata ISO',
            ipv4: 'indirizzo IPv4',
            ipv6: 'indirizzo IPv6',
            cidrv4: 'intervallo IPv4',
            cidrv6: 'intervallo IPv6',
            base64: 'stringa codificata in base64',
            base64url: 'URL codificata in base64',
            json_string: 'stringa JSON',
            e164: 'numero E.164',
            jwt: 'JWT',
            template_literal: 'input',
        };
    return (I) => {
        switch (I.code) {
            case 'invalid_type':
                return `Input non valido: atteso ${I.expected}, ricevuto ${U(I.input)}`;
            case 'invalid_value':
                if (I.values.length === 1)
                    return `Input non valido: atteso ${M(I.values[0])}`;
                return `Opzione non valida: atteso uno tra ${X(I.values, '|')}`;
            case 'too_big': {
                let P = I.inclusive ? '<=' : '<',
                    S = v(I.origin);
                if (S)
                    return `Troppo grande: ${I.origin ?? 'valore'} deve avere ${P}${I.maximum.toString()} ${S.unit ?? 'elementi'}`;
                return `Troppo grande: ${I.origin ?? 'valore'} deve essere ${P}${I.maximum.toString()}`;
            }
            case 'too_small': {
                let P = I.inclusive ? '>=' : '>',
                    S = v(I.origin);
                if (S)
                    return `Troppo piccolo: ${I.origin} deve avere ${P}${I.minimum.toString()} ${S.unit}`;
                return `Troppo piccolo: ${I.origin} deve essere ${P}${I.minimum.toString()}`;
            }
            case 'invalid_format': {
                let P = I;
                if (P.format === 'starts_with')
                    return `Stringa non valida: deve iniziare con "${P.prefix}"`;
                if (P.format === 'ends_with')
                    return `Stringa non valida: deve terminare con "${P.suffix}"`;
                if (P.format === 'includes')
                    return `Stringa non valida: deve includere "${P.includes}"`;
                if (P.format === 'regex')
                    return `Stringa non valida: deve corrispondere al pattern ${P.pattern}`;
                return `Invalid ${N[P.format] ?? I.format}`;
            }
            case 'not_multiple_of':
                return `Numero non valido: deve essere un multiplo di ${I.divisor}`;
            case 'unrecognized_keys':
                return `Chiav${I.keys.length > 1 ? 'i' : 'e'} non riconosciut${I.keys.length > 1 ? 'e' : 'a'}: ${X(I.keys, ', ')}`;
            case 'invalid_key':
                return `Chiave non valida in ${I.origin}`;
            case 'invalid_union':
                return 'Input non valido';
            case 'invalid_element':
                return `Valore non valido in ${I.origin}`;
            default:
                return 'Input non valido';
        }
    };
};
function CU() {
    return { localeError: BD() };
}
var YD = () => {
    let $ = {
        string: { unit: '\u6587\u5B57', verb: '\u3067\u3042\u308B' },
        file: { unit: '\u30D0\u30A4\u30C8', verb: '\u3067\u3042\u308B' },
        array: { unit: '\u8981\u7D20', verb: '\u3067\u3042\u308B' },
        set: { unit: '\u8981\u7D20', verb: '\u3067\u3042\u308B' },
    };
    function v(I) {
        return $[I] ?? null;
    }
    let U = (I) => {
            let P = typeof I;
            switch (P) {
                case 'number':
                    return Number.isNaN(I) ? 'NaN' : '\u6570\u5024';
                case 'object': {
                    if (Array.isArray(I)) return '\u914D\u5217';
                    if (I === null) return 'null';
                    if (
                        Object.getPrototypeOf(I) !== Object.prototype &&
                        I.constructor
                    )
                        return I.constructor.name;
                }
            }
            return P;
        },
        N = {
            regex: '\u5165\u529B\u5024',
            email: '\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9',
            url: 'URL',
            emoji: '\u7D75\u6587\u5B57',
            uuid: 'UUID',
            uuidv4: 'UUIDv4',
            uuidv6: 'UUIDv6',
            nanoid: 'nanoid',
            guid: 'GUID',
            cuid: 'cuid',
            cuid2: 'cuid2',
            ulid: 'ULID',
            xid: 'XID',
            ksuid: 'KSUID',
            datetime: 'ISO\u65E5\u6642',
            date: 'ISO\u65E5\u4ED8',
            time: 'ISO\u6642\u523B',
            duration: 'ISO\u671F\u9593',
            ipv4: 'IPv4\u30A2\u30C9\u30EC\u30B9',
            ipv6: 'IPv6\u30A2\u30C9\u30EC\u30B9',
            cidrv4: 'IPv4\u7BC4\u56F2',
            cidrv6: 'IPv6\u7BC4\u56F2',
            base64: 'base64\u30A8\u30F3\u30B3\u30FC\u30C9\u6587\u5B57\u5217',
            base64url:
                'base64url\u30A8\u30F3\u30B3\u30FC\u30C9\u6587\u5B57\u5217',
            json_string: 'JSON\u6587\u5B57\u5217',
            e164: 'E.164\u756A\u53F7',
            jwt: 'JWT',
            template_literal: '\u5165\u529B\u5024',
        };
    return (I) => {
        switch (I.code) {
            case 'invalid_type':
                return `\u7121\u52B9\u306A\u5165\u529B: ${I.expected}\u304C\u671F\u5F85\u3055\u308C\u307E\u3057\u305F\u304C\u3001${U(I.input)}\u304C\u5165\u529B\u3055\u308C\u307E\u3057\u305F`;
            case 'invalid_value':
                if (I.values.length === 1)
                    return `\u7121\u52B9\u306A\u5165\u529B: ${M(I.values[0])}\u304C\u671F\u5F85\u3055\u308C\u307E\u3057\u305F`;
                return `\u7121\u52B9\u306A\u9078\u629E: ${X(I.values, '\u3001')}\u306E\u3044\u305A\u308C\u304B\u3067\u3042\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
            case 'too_big': {
                let P = I.inclusive
                        ? '\u4EE5\u4E0B\u3067\u3042\u308B'
                        : '\u3088\u308A\u5C0F\u3055\u3044',
                    S = v(I.origin);
                if (S)
                    return `\u5927\u304D\u3059\u304E\u308B\u5024: ${I.origin ?? '\u5024'}\u306F${I.maximum.toString()}${S.unit ?? '\u8981\u7D20'}${P}\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
                return `\u5927\u304D\u3059\u304E\u308B\u5024: ${I.origin ?? '\u5024'}\u306F${I.maximum.toString()}${P}\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
            }
            case 'too_small': {
                let P = I.inclusive
                        ? '\u4EE5\u4E0A\u3067\u3042\u308B'
                        : '\u3088\u308A\u5927\u304D\u3044',
                    S = v(I.origin);
                if (S)
                    return `\u5C0F\u3055\u3059\u304E\u308B\u5024: ${I.origin}\u306F${I.minimum.toString()}${S.unit}${P}\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
                return `\u5C0F\u3055\u3059\u304E\u308B\u5024: ${I.origin}\u306F${I.minimum.toString()}${P}\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
            }
            case 'invalid_format': {
                let P = I;
                if (P.format === 'starts_with')
                    return `\u7121\u52B9\u306A\u6587\u5B57\u5217: "${P.prefix}"\u3067\u59CB\u307E\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
                if (P.format === 'ends_with')
                    return `\u7121\u52B9\u306A\u6587\u5B57\u5217: "${P.suffix}"\u3067\u7D42\u308F\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
                if (P.format === 'includes')
                    return `\u7121\u52B9\u306A\u6587\u5B57\u5217: "${P.includes}"\u3092\u542B\u3080\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
                if (P.format === 'regex')
                    return `\u7121\u52B9\u306A\u6587\u5B57\u5217: \u30D1\u30BF\u30FC\u30F3${P.pattern}\u306B\u4E00\u81F4\u3059\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
                return `\u7121\u52B9\u306A${N[P.format] ?? I.format}`;
            }
            case 'not_multiple_of':
                return `\u7121\u52B9\u306A\u6570\u5024: ${I.divisor}\u306E\u500D\u6570\u3067\u3042\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
            case 'unrecognized_keys':
                return `\u8A8D\u8B58\u3055\u308C\u3066\u3044\u306A\u3044\u30AD\u30FC${I.keys.length > 1 ? '\u7FA4' : ''}: ${X(I.keys, '\u3001')}`;
            case 'invalid_key':
                return `${I.origin}\u5185\u306E\u7121\u52B9\u306A\u30AD\u30FC`;
            case 'invalid_union':
                return '\u7121\u52B9\u306A\u5165\u529B';
            case 'invalid_element':
                return `${I.origin}\u5185\u306E\u7121\u52B9\u306A\u5024`;
            default:
                return '\u7121\u52B9\u306A\u5165\u529B';
        }
    };
};
function rU() {
    return { localeError: YD() };
}
var QD = () => {
    let $ = {
        string: {
            unit: '\u178F\u17BD\u17A2\u1780\u17D2\u179F\u179A',
            verb: '\u1782\u17BD\u179A\u1798\u17B6\u1793',
        },
        file: {
            unit: '\u1794\u17C3',
            verb: '\u1782\u17BD\u179A\u1798\u17B6\u1793',
        },
        array: {
            unit: '\u1792\u17B6\u178F\u17BB',
            verb: '\u1782\u17BD\u179A\u1798\u17B6\u1793',
        },
        set: {
            unit: '\u1792\u17B6\u178F\u17BB',
            verb: '\u1782\u17BD\u179A\u1798\u17B6\u1793',
        },
    };
    function v(I) {
        return $[I] ?? null;
    }
    let U = (I) => {
            let P = typeof I;
            switch (P) {
                case 'number':
                    return Number.isNaN(I)
                        ? '\u1798\u17B7\u1793\u1798\u17C2\u1793\u1787\u17B6\u179B\u17C1\u1781 (NaN)'
                        : '\u179B\u17C1\u1781';
                case 'object': {
                    if (Array.isArray(I))
                        return '\u17A2\u17B6\u179A\u17C1 (Array)';
                    if (I === null)
                        return '\u1782\u17D2\u1798\u17B6\u1793\u178F\u1798\u17D2\u179B\u17C3 (null)';
                    if (
                        Object.getPrototypeOf(I) !== Object.prototype &&
                        I.constructor
                    )
                        return I.constructor.name;
                }
            }
            return P;
        },
        N = {
            regex: '\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B',
            email: '\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793\u17A2\u17CA\u17B8\u1798\u17C2\u179B',
            url: 'URL',
            emoji: '\u179F\u1789\u17D2\u1789\u17B6\u17A2\u17B6\u179A\u1798\u17D2\u1798\u178E\u17CD',
            uuid: 'UUID',
            uuidv4: 'UUIDv4',
            uuidv6: 'UUIDv6',
            nanoid: 'nanoid',
            guid: 'GUID',
            cuid: 'cuid',
            cuid2: 'cuid2',
            ulid: 'ULID',
            xid: 'XID',
            ksuid: 'KSUID',
            datetime:
                '\u1780\u17B6\u179B\u1794\u179A\u17B7\u1785\u17D2\u1786\u17C1\u1791 \u1793\u17B7\u1784\u1798\u17C9\u17C4\u1784 ISO',
            date: '\u1780\u17B6\u179B\u1794\u179A\u17B7\u1785\u17D2\u1786\u17C1\u1791 ISO',
            time: '\u1798\u17C9\u17C4\u1784 ISO',
            duration: '\u179A\u1799\u17C8\u1796\u17C1\u179B ISO',
            ipv4: '\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793 IPv4',
            ipv6: '\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793 IPv6',
            cidrv4: '\u178A\u17C2\u1793\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793 IPv4',
            cidrv6: '\u178A\u17C2\u1793\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793 IPv6',
            base64: '\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u17A2\u17CA\u17B7\u1780\u17BC\u178A base64',
            base64url:
                '\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u17A2\u17CA\u17B7\u1780\u17BC\u178A base64url',
            json_string:
                '\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A JSON',
            e164: '\u179B\u17C1\u1781 E.164',
            jwt: 'JWT',
            template_literal:
                '\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B',
        };
    return (I) => {
        switch (I.code) {
            case 'invalid_type':
                return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${I.expected} \u1794\u17C9\u17BB\u1793\u17D2\u178F\u17C2\u1791\u1791\u17BD\u179B\u1794\u17B6\u1793 ${U(I.input)}`;
            case 'invalid_value':
                if (I.values.length === 1)
                    return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${M(I.values[0])}`;
                return `\u1787\u1798\u17D2\u179A\u17BE\u179F\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1787\u17B6\u1798\u17BD\u1799\u1780\u17D2\u1793\u17BB\u1784\u1785\u17C6\u178E\u17C4\u1798 ${X(I.values, '|')}`;
            case 'too_big': {
                let P = I.inclusive ? '<=' : '<',
                    S = v(I.origin);
                if (S)
                    return `\u1792\u17C6\u1796\u17C1\u1780\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${I.origin ?? '\u178F\u1798\u17D2\u179B\u17C3'} ${P} ${I.maximum.toString()} ${S.unit ?? '\u1792\u17B6\u178F\u17BB'}`;
                return `\u1792\u17C6\u1796\u17C1\u1780\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${I.origin ?? '\u178F\u1798\u17D2\u179B\u17C3'} ${P} ${I.maximum.toString()}`;
            }
            case 'too_small': {
                let P = I.inclusive ? '>=' : '>',
                    S = v(I.origin);
                if (S)
                    return `\u178F\u17BC\u1785\u1796\u17C1\u1780\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${I.origin} ${P} ${I.minimum.toString()} ${S.unit}`;
                return `\u178F\u17BC\u1785\u1796\u17C1\u1780\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${I.origin} ${P} ${I.minimum.toString()}`;
            }
            case 'invalid_format': {
                let P = I;
                if (P.format === 'starts_with')
                    return `\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1785\u17B6\u1794\u17CB\u1795\u17D2\u178F\u17BE\u1798\u178A\u17C4\u1799 "${P.prefix}"`;
                if (P.format === 'ends_with')
                    return `\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1794\u1789\u17D2\u1785\u1794\u17CB\u178A\u17C4\u1799 "${P.suffix}"`;
                if (P.format === 'includes')
                    return `\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1798\u17B6\u1793 "${P.includes}"`;
                if (P.format === 'regex')
                    return `\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u178F\u17C2\u1795\u17D2\u1782\u17BC\u1795\u17D2\u1782\u1784\u1793\u17B9\u1784\u1791\u1798\u17D2\u179A\u1784\u17CB\u178A\u17C2\u179B\u1794\u17B6\u1793\u1780\u17C6\u178E\u178F\u17CB ${P.pattern}`;
                return `\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 ${N[P.format] ?? I.format}`;
            }
            case 'not_multiple_of':
                return `\u179B\u17C1\u1781\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u178F\u17C2\u1787\u17B6\u1796\u17A0\u17BB\u1782\u17BB\u178E\u1793\u17C3 ${I.divisor}`;
            case 'unrecognized_keys':
                return `\u179A\u1780\u1783\u17BE\u1789\u179F\u17C4\u1798\u17B7\u1793\u179F\u17D2\u1782\u17B6\u179B\u17CB\u17D6 ${X(I.keys, ', ')}`;
            case 'invalid_key':
                return `\u179F\u17C4\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u1793\u17C5\u1780\u17D2\u1793\u17BB\u1784 ${I.origin}`;
            case 'invalid_union':
                return '\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C';
            case 'invalid_element':
                return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u1793\u17C5\u1780\u17D2\u1793\u17BB\u1784 ${I.origin}`;
            default:
                return '\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C';
        }
    };
};
function TU() {
    return { localeError: QD() };
}
var MD = () => {
    let $ = {
        string: { unit: '\uBB38\uC790', verb: 'to have' },
        file: { unit: '\uBC14\uC774\uD2B8', verb: 'to have' },
        array: { unit: '\uAC1C', verb: 'to have' },
        set: { unit: '\uAC1C', verb: 'to have' },
    };
    function v(I) {
        return $[I] ?? null;
    }
    let U = (I) => {
            let P = typeof I;
            switch (P) {
                case 'number':
                    return Number.isNaN(I) ? 'NaN' : 'number';
                case 'object': {
                    if (Array.isArray(I)) return 'array';
                    if (I === null) return 'null';
                    if (
                        Object.getPrototypeOf(I) !== Object.prototype &&
                        I.constructor
                    )
                        return I.constructor.name;
                }
            }
            return P;
        },
        N = {
            regex: '\uC785\uB825',
            email: '\uC774\uBA54\uC77C \uC8FC\uC18C',
            url: 'URL',
            emoji: '\uC774\uBAA8\uC9C0',
            uuid: 'UUID',
            uuidv4: 'UUIDv4',
            uuidv6: 'UUIDv6',
            nanoid: 'nanoid',
            guid: 'GUID',
            cuid: 'cuid',
            cuid2: 'cuid2',
            ulid: 'ULID',
            xid: 'XID',
            ksuid: 'KSUID',
            datetime: 'ISO \uB0A0\uC9DC\uC2DC\uAC04',
            date: 'ISO \uB0A0\uC9DC',
            time: 'ISO \uC2DC\uAC04',
            duration: 'ISO \uAE30\uAC04',
            ipv4: 'IPv4 \uC8FC\uC18C',
            ipv6: 'IPv6 \uC8FC\uC18C',
            cidrv4: 'IPv4 \uBC94\uC704',
            cidrv6: 'IPv6 \uBC94\uC704',
            base64: 'base64 \uC778\uCF54\uB529 \uBB38\uC790\uC5F4',
            base64url: 'base64url \uC778\uCF54\uB529 \uBB38\uC790\uC5F4',
            json_string: 'JSON \uBB38\uC790\uC5F4',
            e164: 'E.164 \uBC88\uD638',
            jwt: 'JWT',
            template_literal: '\uC785\uB825',
        };
    return (I) => {
        switch (I.code) {
            case 'invalid_type':
                return `\uC798\uBABB\uB41C \uC785\uB825: \uC608\uC0C1 \uD0C0\uC785\uC740 ${I.expected}, \uBC1B\uC740 \uD0C0\uC785\uC740 ${U(I.input)}\uC785\uB2C8\uB2E4`;
            case 'invalid_value':
                if (I.values.length === 1)
                    return `\uC798\uBABB\uB41C \uC785\uB825: \uAC12\uC740 ${M(I.values[0])} \uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4`;
                return `\uC798\uBABB\uB41C \uC635\uC158: ${X(I.values, '\uB610\uB294 ')} \uC911 \uD558\uB098\uC5EC\uC57C \uD569\uB2C8\uB2E4`;
            case 'too_big': {
                let P = I.inclusive ? '\uC774\uD558' : '\uBBF8\uB9CC',
                    S =
                        P === '\uBBF8\uB9CC'
                            ? '\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4'
                            : '\uC5EC\uC57C \uD569\uB2C8\uB2E4',
                    O = v(I.origin),
                    J = O?.unit ?? '\uC694\uC18C';
                if (O)
                    return `${I.origin ?? '\uAC12'}\uC774 \uB108\uBB34 \uD07D\uB2C8\uB2E4: ${I.maximum.toString()}${J} ${P}${S}`;
                return `${I.origin ?? '\uAC12'}\uC774 \uB108\uBB34 \uD07D\uB2C8\uB2E4: ${I.maximum.toString()} ${P}${S}`;
            }
            case 'too_small': {
                let P = I.inclusive ? '\uC774\uC0C1' : '\uCD08\uACFC',
                    S =
                        P === '\uC774\uC0C1'
                            ? '\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4'
                            : '\uC5EC\uC57C \uD569\uB2C8\uB2E4',
                    O = v(I.origin),
                    J = O?.unit ?? '\uC694\uC18C';
                if (O)
                    return `${I.origin ?? '\uAC12'}\uC774 \uB108\uBB34 \uC791\uC2B5\uB2C8\uB2E4: ${I.minimum.toString()}${J} ${P}${S}`;
                return `${I.origin ?? '\uAC12'}\uC774 \uB108\uBB34 \uC791\uC2B5\uB2C8\uB2E4: ${I.minimum.toString()} ${P}${S}`;
            }
            case 'invalid_format': {
                let P = I;
                if (P.format === 'starts_with')
                    return `\uC798\uBABB\uB41C \uBB38\uC790\uC5F4: "${P.prefix}"(\uC73C)\uB85C \uC2DC\uC791\uD574\uC57C \uD569\uB2C8\uB2E4`;
                if (P.format === 'ends_with')
                    return `\uC798\uBABB\uB41C \uBB38\uC790\uC5F4: "${P.suffix}"(\uC73C)\uB85C \uB05D\uB098\uC57C \uD569\uB2C8\uB2E4`;
                if (P.format === 'includes')
                    return `\uC798\uBABB\uB41C \uBB38\uC790\uC5F4: "${P.includes}"\uC744(\uB97C) \uD3EC\uD568\uD574\uC57C \uD569\uB2C8\uB2E4`;
                if (P.format === 'regex')
                    return `\uC798\uBABB\uB41C \uBB38\uC790\uC5F4: \uC815\uADDC\uC2DD ${P.pattern} \uD328\uD134\uACFC \uC77C\uCE58\uD574\uC57C \uD569\uB2C8\uB2E4`;
                return `\uC798\uBABB\uB41C ${N[P.format] ?? I.format}`;
            }
            case 'not_multiple_of':
                return `\uC798\uBABB\uB41C \uC22B\uC790: ${I.divisor}\uC758 \uBC30\uC218\uC5EC\uC57C \uD569\uB2C8\uB2E4`;
            case 'unrecognized_keys':
                return `\uC778\uC2DD\uD560 \uC218 \uC5C6\uB294 \uD0A4: ${X(I.keys, ', ')}`;
            case 'invalid_key':
                return `\uC798\uBABB\uB41C \uD0A4: ${I.origin}`;
            case 'invalid_union':
                return '\uC798\uBABB\uB41C \uC785\uB825';
            case 'invalid_element':
                return `\uC798\uBABB\uB41C \uAC12: ${I.origin}`;
            default:
                return '\uC798\uBABB\uB41C \uC785\uB825';
        }
    };
};
function xU() {
    return { localeError: MD() };
}
var HD = () => {
    let $ = {
        string: {
            unit: '\u0437\u043D\u0430\u0446\u0438',
            verb: '\u0434\u0430 \u0438\u043C\u0430\u0430\u0442',
        },
        file: {
            unit: '\u0431\u0430\u0458\u0442\u0438',
            verb: '\u0434\u0430 \u0438\u043C\u0430\u0430\u0442',
        },
        array: {
            unit: '\u0441\u0442\u0430\u0432\u043A\u0438',
            verb: '\u0434\u0430 \u0438\u043C\u0430\u0430\u0442',
        },
        set: {
            unit: '\u0441\u0442\u0430\u0432\u043A\u0438',
            verb: '\u0434\u0430 \u0438\u043C\u0430\u0430\u0442',
        },
    };
    function v(I) {
        return $[I] ?? null;
    }
    let U = (I) => {
            let P = typeof I;
            switch (P) {
                case 'number':
                    return Number.isNaN(I) ? 'NaN' : '\u0431\u0440\u043E\u0458';
                case 'object': {
                    if (Array.isArray(I)) return '\u043D\u0438\u0437\u0430';
                    if (I === null) return 'null';
                    if (
                        Object.getPrototypeOf(I) !== Object.prototype &&
                        I.constructor
                    )
                        return I.constructor.name;
                }
            }
            return P;
        },
        N = {
            regex: '\u0432\u043D\u0435\u0441',
            email: '\u0430\u0434\u0440\u0435\u0441\u0430 \u043D\u0430 \u0435-\u043F\u043E\u0448\u0442\u0430',
            url: 'URL',
            emoji: '\u0435\u043C\u043E\u045F\u0438',
            uuid: 'UUID',
            uuidv4: 'UUIDv4',
            uuidv6: 'UUIDv6',
            nanoid: 'nanoid',
            guid: 'GUID',
            cuid: 'cuid',
            cuid2: 'cuid2',
            ulid: 'ULID',
            xid: 'XID',
            ksuid: 'KSUID',
            datetime:
                'ISO \u0434\u0430\u0442\u0443\u043C \u0438 \u0432\u0440\u0435\u043C\u0435',
            date: 'ISO \u0434\u0430\u0442\u0443\u043C',
            time: 'ISO \u0432\u0440\u0435\u043C\u0435',
            duration:
                'ISO \u0432\u0440\u0435\u043C\u0435\u0442\u0440\u0430\u0435\u045A\u0435',
            ipv4: 'IPv4 \u0430\u0434\u0440\u0435\u0441\u0430',
            ipv6: 'IPv6 \u0430\u0434\u0440\u0435\u0441\u0430',
            cidrv4: 'IPv4 \u043E\u043F\u0441\u0435\u0433',
            cidrv6: 'IPv6 \u043E\u043F\u0441\u0435\u0433',
            base64: 'base64-\u0435\u043D\u043A\u043E\u0434\u0438\u0440\u0430\u043D\u0430 \u043D\u0438\u0437\u0430',
            base64url:
                'base64url-\u0435\u043D\u043A\u043E\u0434\u0438\u0440\u0430\u043D\u0430 \u043D\u0438\u0437\u0430',
            json_string: 'JSON \u043D\u0438\u0437\u0430',
            e164: 'E.164 \u0431\u0440\u043E\u0458',
            jwt: 'JWT',
            template_literal: '\u0432\u043D\u0435\u0441',
        };
    return (I) => {
        switch (I.code) {
            case 'invalid_type':
                return `\u0413\u0440\u0435\u0448\u0435\u043D \u0432\u043D\u0435\u0441: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${I.expected}, \u043F\u0440\u0438\u043C\u0435\u043D\u043E ${U(I.input)}`;
            case 'invalid_value':
                if (I.values.length === 1)
                    return `Invalid input: expected ${M(I.values[0])}`;
                return `\u0413\u0440\u0435\u0448\u0430\u043D\u0430 \u043E\u043F\u0446\u0438\u0458\u0430: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 \u0435\u0434\u043D\u0430 ${X(I.values, '|')}`;
            case 'too_big': {
                let P = I.inclusive ? '<=' : '<',
                    S = v(I.origin);
                if (S)
                    return `\u041F\u0440\u0435\u043C\u043D\u043E\u0433\u0443 \u0433\u043E\u043B\u0435\u043C: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${I.origin ?? '\u0432\u0440\u0435\u0434\u043D\u043E\u0441\u0442\u0430'} \u0434\u0430 \u0438\u043C\u0430 ${P}${I.maximum.toString()} ${S.unit ?? '\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0438'}`;
                return `\u041F\u0440\u0435\u043C\u043D\u043E\u0433\u0443 \u0433\u043E\u043B\u0435\u043C: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${I.origin ?? '\u0432\u0440\u0435\u0434\u043D\u043E\u0441\u0442\u0430'} \u0434\u0430 \u0431\u0438\u0434\u0435 ${P}${I.maximum.toString()}`;
            }
            case 'too_small': {
                let P = I.inclusive ? '>=' : '>',
                    S = v(I.origin);
                if (S)
                    return `\u041F\u0440\u0435\u043C\u043D\u043E\u0433\u0443 \u043C\u0430\u043B: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${I.origin} \u0434\u0430 \u0438\u043C\u0430 ${P}${I.minimum.toString()} ${S.unit}`;
                return `\u041F\u0440\u0435\u043C\u043D\u043E\u0433\u0443 \u043C\u0430\u043B: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${I.origin} \u0434\u0430 \u0431\u0438\u0434\u0435 ${P}${I.minimum.toString()}`;
            }
            case 'invalid_format': {
                let P = I;
                if (P.format === 'starts_with')
                    return `\u041D\u0435\u0432\u0430\u0436\u0435\u0447\u043A\u0430 \u043D\u0438\u0437\u0430: \u043C\u043E\u0440\u0430 \u0434\u0430 \u0437\u0430\u043F\u043E\u0447\u043D\u0443\u0432\u0430 \u0441\u043E "${P.prefix}"`;
                if (P.format === 'ends_with')
                    return `\u041D\u0435\u0432\u0430\u0436\u0435\u0447\u043A\u0430 \u043D\u0438\u0437\u0430: \u043C\u043E\u0440\u0430 \u0434\u0430 \u0437\u0430\u0432\u0440\u0448\u0443\u0432\u0430 \u0441\u043E "${P.suffix}"`;
                if (P.format === 'includes')
                    return `\u041D\u0435\u0432\u0430\u0436\u0435\u0447\u043A\u0430 \u043D\u0438\u0437\u0430: \u043C\u043E\u0440\u0430 \u0434\u0430 \u0432\u043A\u043B\u0443\u0447\u0443\u0432\u0430 "${P.includes}"`;
                if (P.format === 'regex')
                    return `\u041D\u0435\u0432\u0430\u0436\u0435\u0447\u043A\u0430 \u043D\u0438\u0437\u0430: \u043C\u043E\u0440\u0430 \u0434\u0430 \u043E\u0434\u0433\u043E\u0430\u0440\u0430 \u043D\u0430 \u043F\u0430\u0442\u0435\u0440\u043D\u043E\u0442 ${P.pattern}`;
                return `Invalid ${N[P.format] ?? I.format}`;
            }
            case 'not_multiple_of':
                return `\u0413\u0440\u0435\u0448\u0435\u043D \u0431\u0440\u043E\u0458: \u043C\u043E\u0440\u0430 \u0434\u0430 \u0431\u0438\u0434\u0435 \u0434\u0435\u043B\u0438\u0432 \u0441\u043E ${I.divisor}`;
            case 'unrecognized_keys':
                return `${I.keys.length > 1 ? '\u041D\u0435\u043F\u0440\u0435\u043F\u043E\u0437\u043D\u0430\u0435\u043D\u0438 \u043A\u043B\u0443\u0447\u0435\u0432\u0438' : '\u041D\u0435\u043F\u0440\u0435\u043F\u043E\u0437\u043D\u0430\u0435\u043D \u043A\u043B\u0443\u0447'}: ${X(I.keys, ', ')}`;
            case 'invalid_key':
                return `\u0413\u0440\u0435\u0448\u0435\u043D \u043A\u043B\u0443\u0447 \u0432\u043E ${I.origin}`;
            case 'invalid_union':
                return '\u0413\u0440\u0435\u0448\u0435\u043D \u0432\u043D\u0435\u0441';
            case 'invalid_element':
                return `\u0413\u0440\u0435\u0448\u043D\u0430 \u0432\u0440\u0435\u0434\u043D\u043E\u0441\u0442 \u0432\u043E ${I.origin}`;
            default:
                return '\u0413\u0440\u0435\u0448\u0435\u043D \u0432\u043D\u0435\u0441';
        }
    };
};
function fU() {
    return { localeError: HD() };
}
var jD = () => {
    let $ = {
        string: { unit: 'aksara', verb: 'mempunyai' },
        file: { unit: 'bait', verb: 'mempunyai' },
        array: { unit: 'elemen', verb: 'mempunyai' },
        set: { unit: 'elemen', verb: 'mempunyai' },
    };
    function v(I) {
        return $[I] ?? null;
    }
    let U = (I) => {
            let P = typeof I;
            switch (P) {
                case 'number':
                    return Number.isNaN(I) ? 'NaN' : 'nombor';
                case 'object': {
                    if (Array.isArray(I)) return 'array';
                    if (I === null) return 'null';
                    if (
                        Object.getPrototypeOf(I) !== Object.prototype &&
                        I.constructor
                    )
                        return I.constructor.name;
                }
            }
            return P;
        },
        N = {
            regex: 'input',
            email: 'alamat e-mel',
            url: 'URL',
            emoji: 'emoji',
            uuid: 'UUID',
            uuidv4: 'UUIDv4',
            uuidv6: 'UUIDv6',
            nanoid: 'nanoid',
            guid: 'GUID',
            cuid: 'cuid',
            cuid2: 'cuid2',
            ulid: 'ULID',
            xid: 'XID',
            ksuid: 'KSUID',
            datetime: 'tarikh masa ISO',
            date: 'tarikh ISO',
            time: 'masa ISO',
            duration: 'tempoh ISO',
            ipv4: 'alamat IPv4',
            ipv6: 'alamat IPv6',
            cidrv4: 'julat IPv4',
            cidrv6: 'julat IPv6',
            base64: 'string dikodkan base64',
            base64url: 'string dikodkan base64url',
            json_string: 'string JSON',
            e164: 'nombor E.164',
            jwt: 'JWT',
            template_literal: 'input',
        };
    return (I) => {
        switch (I.code) {
            case 'invalid_type':
                return `Input tidak sah: dijangka ${I.expected}, diterima ${U(I.input)}`;
            case 'invalid_value':
                if (I.values.length === 1)
                    return `Input tidak sah: dijangka ${M(I.values[0])}`;
                return `Pilihan tidak sah: dijangka salah satu daripada ${X(I.values, '|')}`;
            case 'too_big': {
                let P = I.inclusive ? '<=' : '<',
                    S = v(I.origin);
                if (S)
                    return `Terlalu besar: dijangka ${I.origin ?? 'nilai'} ${S.verb} ${P}${I.maximum.toString()} ${S.unit ?? 'elemen'}`;
                return `Terlalu besar: dijangka ${I.origin ?? 'nilai'} adalah ${P}${I.maximum.toString()}`;
            }
            case 'too_small': {
                let P = I.inclusive ? '>=' : '>',
                    S = v(I.origin);
                if (S)
                    return `Terlalu kecil: dijangka ${I.origin} ${S.verb} ${P}${I.minimum.toString()} ${S.unit}`;
                return `Terlalu kecil: dijangka ${I.origin} adalah ${P}${I.minimum.toString()}`;
            }
            case 'invalid_format': {
                let P = I;
                if (P.format === 'starts_with')
                    return `String tidak sah: mesti bermula dengan "${P.prefix}"`;
                if (P.format === 'ends_with')
                    return `String tidak sah: mesti berakhir dengan "${P.suffix}"`;
                if (P.format === 'includes')
                    return `String tidak sah: mesti mengandungi "${P.includes}"`;
                if (P.format === 'regex')
                    return `String tidak sah: mesti sepadan dengan corak ${P.pattern}`;
                return `${N[P.format] ?? I.format} tidak sah`;
            }
            case 'not_multiple_of':
                return `Nombor tidak sah: perlu gandaan ${I.divisor}`;
            case 'unrecognized_keys':
                return `Kunci tidak dikenali: ${X(I.keys, ', ')}`;
            case 'invalid_key':
                return `Kunci tidak sah dalam ${I.origin}`;
            case 'invalid_union':
                return 'Input tidak sah';
            case 'invalid_element':
                return `Nilai tidak sah dalam ${I.origin}`;
            default:
                return 'Input tidak sah';
        }
    };
};
function mU() {
    return { localeError: jD() };
}
var KD = () => {
    let $ = {
        string: { unit: 'tekens' },
        file: { unit: 'bytes' },
        array: { unit: 'elementen' },
        set: { unit: 'elementen' },
    };
    function v(I) {
        return $[I] ?? null;
    }
    let U = (I) => {
            let P = typeof I;
            switch (P) {
                case 'number':
                    return Number.isNaN(I) ? 'NaN' : 'getal';
                case 'object': {
                    if (Array.isArray(I)) return 'array';
                    if (I === null) return 'null';
                    if (
                        Object.getPrototypeOf(I) !== Object.prototype &&
                        I.constructor
                    )
                        return I.constructor.name;
                }
            }
            return P;
        },
        N = {
            regex: 'invoer',
            email: 'emailadres',
            url: 'URL',
            emoji: 'emoji',
            uuid: 'UUID',
            uuidv4: 'UUIDv4',
            uuidv6: 'UUIDv6',
            nanoid: 'nanoid',
            guid: 'GUID',
            cuid: 'cuid',
            cuid2: 'cuid2',
            ulid: 'ULID',
            xid: 'XID',
            ksuid: 'KSUID',
            datetime: 'ISO datum en tijd',
            date: 'ISO datum',
            time: 'ISO tijd',
            duration: 'ISO duur',
            ipv4: 'IPv4-adres',
            ipv6: 'IPv6-adres',
            cidrv4: 'IPv4-bereik',
            cidrv6: 'IPv6-bereik',
            base64: 'base64-gecodeerde tekst',
            base64url: 'base64 URL-gecodeerde tekst',
            json_string: 'JSON string',
            e164: 'E.164-nummer',
            jwt: 'JWT',
            template_literal: 'invoer',
        };
    return (I) => {
        switch (I.code) {
            case 'invalid_type':
                return `Ongeldige invoer: verwacht ${I.expected}, ontving ${U(I.input)}`;
            case 'invalid_value':
                if (I.values.length === 1)
                    return `Ongeldige invoer: verwacht ${M(I.values[0])}`;
                return `Ongeldige optie: verwacht \xE9\xE9n van ${X(I.values, '|')}`;
            case 'too_big': {
                let P = I.inclusive ? '<=' : '<',
                    S = v(I.origin);
                if (S)
                    return `Te lang: verwacht dat ${I.origin ?? 'waarde'} ${P}${I.maximum.toString()} ${S.unit ?? 'elementen'} bevat`;
                return `Te lang: verwacht dat ${I.origin ?? 'waarde'} ${P}${I.maximum.toString()} is`;
            }
            case 'too_small': {
                let P = I.inclusive ? '>=' : '>',
                    S = v(I.origin);
                if (S)
                    return `Te kort: verwacht dat ${I.origin} ${P}${I.minimum.toString()} ${S.unit} bevat`;
                return `Te kort: verwacht dat ${I.origin} ${P}${I.minimum.toString()} is`;
            }
            case 'invalid_format': {
                let P = I;
                if (P.format === 'starts_with')
                    return `Ongeldige tekst: moet met "${P.prefix}" beginnen`;
                if (P.format === 'ends_with')
                    return `Ongeldige tekst: moet op "${P.suffix}" eindigen`;
                if (P.format === 'includes')
                    return `Ongeldige tekst: moet "${P.includes}" bevatten`;
                if (P.format === 'regex')
                    return `Ongeldige tekst: moet overeenkomen met patroon ${P.pattern}`;
                return `Ongeldig: ${N[P.format] ?? I.format}`;
            }
            case 'not_multiple_of':
                return `Ongeldig getal: moet een veelvoud van ${I.divisor} zijn`;
            case 'unrecognized_keys':
                return `Onbekende key${I.keys.length > 1 ? 's' : ''}: ${X(I.keys, ', ')}`;
            case 'invalid_key':
                return `Ongeldige key in ${I.origin}`;
            case 'invalid_union':
                return 'Ongeldige invoer';
            case 'invalid_element':
                return `Ongeldige waarde in ${I.origin}`;
            default:
                return 'Ongeldige invoer';
        }
    };
};
function gU() {
    return { localeError: KD() };
}
var wD = () => {
    let $ = {
        string: { unit: 'tegn', verb: '\xE5 ha' },
        file: { unit: 'bytes', verb: '\xE5 ha' },
        array: { unit: 'elementer', verb: '\xE5 inneholde' },
        set: { unit: 'elementer', verb: '\xE5 inneholde' },
    };
    function v(I) {
        return $[I] ?? null;
    }
    let U = (I) => {
            let P = typeof I;
            switch (P) {
                case 'number':
                    return Number.isNaN(I) ? 'NaN' : 'tall';
                case 'object': {
                    if (Array.isArray(I)) return 'liste';
                    if (I === null) return 'null';
                    if (
                        Object.getPrototypeOf(I) !== Object.prototype &&
                        I.constructor
                    )
                        return I.constructor.name;
                }
            }
            return P;
        },
        N = {
            regex: 'input',
            email: 'e-postadresse',
            url: 'URL',
            emoji: 'emoji',
            uuid: 'UUID',
            uuidv4: 'UUIDv4',
            uuidv6: 'UUIDv6',
            nanoid: 'nanoid',
            guid: 'GUID',
            cuid: 'cuid',
            cuid2: 'cuid2',
            ulid: 'ULID',
            xid: 'XID',
            ksuid: 'KSUID',
            datetime: 'ISO dato- og klokkeslett',
            date: 'ISO-dato',
            time: 'ISO-klokkeslett',
            duration: 'ISO-varighet',
            ipv4: 'IPv4-omr\xE5de',
            ipv6: 'IPv6-omr\xE5de',
            cidrv4: 'IPv4-spekter',
            cidrv6: 'IPv6-spekter',
            base64: 'base64-enkodet streng',
            base64url: 'base64url-enkodet streng',
            json_string: 'JSON-streng',
            e164: 'E.164-nummer',
            jwt: 'JWT',
            template_literal: 'input',
        };
    return (I) => {
        switch (I.code) {
            case 'invalid_type':
                return `Ugyldig input: forventet ${I.expected}, fikk ${U(I.input)}`;
            case 'invalid_value':
                if (I.values.length === 1)
                    return `Ugyldig verdi: forventet ${M(I.values[0])}`;
                return `Ugyldig valg: forventet en av ${X(I.values, '|')}`;
            case 'too_big': {
                let P = I.inclusive ? '<=' : '<',
                    S = v(I.origin);
                if (S)
                    return `For stor(t): forventet ${I.origin ?? 'value'} til \xE5 ha ${P}${I.maximum.toString()} ${S.unit ?? 'elementer'}`;
                return `For stor(t): forventet ${I.origin ?? 'value'} til \xE5 ha ${P}${I.maximum.toString()}`;
            }
            case 'too_small': {
                let P = I.inclusive ? '>=' : '>',
                    S = v(I.origin);
                if (S)
                    return `For lite(n): forventet ${I.origin} til \xE5 ha ${P}${I.minimum.toString()} ${S.unit}`;
                return `For lite(n): forventet ${I.origin} til \xE5 ha ${P}${I.minimum.toString()}`;
            }
            case 'invalid_format': {
                let P = I;
                if (P.format === 'starts_with')
                    return `Ugyldig streng: m\xE5 starte med "${P.prefix}"`;
                if (P.format === 'ends_with')
                    return `Ugyldig streng: m\xE5 ende med "${P.suffix}"`;
                if (P.format === 'includes')
                    return `Ugyldig streng: m\xE5 inneholde "${P.includes}"`;
                if (P.format === 'regex')
                    return `Ugyldig streng: m\xE5 matche m\xF8nsteret ${P.pattern}`;
                return `Ugyldig ${N[P.format] ?? I.format}`;
            }
            case 'not_multiple_of':
                return `Ugyldig tall: m\xE5 v\xE6re et multiplum av ${I.divisor}`;
            case 'unrecognized_keys':
                return `${I.keys.length > 1 ? 'Ukjente n\xF8kler' : 'Ukjent n\xF8kkel'}: ${X(I.keys, ', ')}`;
            case 'invalid_key':
                return `Ugyldig n\xF8kkel i ${I.origin}`;
            case 'invalid_union':
                return 'Ugyldig input';
            case 'invalid_element':
                return `Ugyldig verdi i ${I.origin}`;
            default:
                return 'Ugyldig input';
        }
    };
};
function nU() {
    return { localeError: wD() };
}
var bD = () => {
    let $ = {
        string: { unit: 'harf', verb: 'olmal\u0131d\u0131r' },
        file: { unit: 'bayt', verb: 'olmal\u0131d\u0131r' },
        array: { unit: 'unsur', verb: 'olmal\u0131d\u0131r' },
        set: { unit: 'unsur', verb: 'olmal\u0131d\u0131r' },
    };
    function v(I) {
        return $[I] ?? null;
    }
    let U = (I) => {
            let P = typeof I;
            switch (P) {
                case 'number':
                    return Number.isNaN(I) ? 'NaN' : 'numara';
                case 'object': {
                    if (Array.isArray(I)) return 'saf';
                    if (I === null) return 'gayb';
                    if (
                        Object.getPrototypeOf(I) !== Object.prototype &&
                        I.constructor
                    )
                        return I.constructor.name;
                }
            }
            return P;
        },
        N = {
            regex: 'giren',
            email: 'epostag\xE2h',
            url: 'URL',
            emoji: 'emoji',
            uuid: 'UUID',
            uuidv4: 'UUIDv4',
            uuidv6: 'UUIDv6',
            nanoid: 'nanoid',
            guid: 'GUID',
            cuid: 'cuid',
            cuid2: 'cuid2',
            ulid: 'ULID',
            xid: 'XID',
            ksuid: 'KSUID',
            datetime: 'ISO heng\xE2m\u0131',
            date: 'ISO tarihi',
            time: 'ISO zaman\u0131',
            duration: 'ISO m\xFCddeti',
            ipv4: 'IPv4 ni\u015F\xE2n\u0131',
            ipv6: 'IPv6 ni\u015F\xE2n\u0131',
            cidrv4: 'IPv4 menzili',
            cidrv6: 'IPv6 menzili',
            base64: 'base64-\u015Fifreli metin',
            base64url: 'base64url-\u015Fifreli metin',
            json_string: 'JSON metin',
            e164: 'E.164 say\u0131s\u0131',
            jwt: 'JWT',
            template_literal: 'giren',
        };
    return (I) => {
        switch (I.code) {
            case 'invalid_type':
                return `F\xE2sit giren: umulan ${I.expected}, al\u0131nan ${U(I.input)}`;
            case 'invalid_value':
                if (I.values.length === 1)
                    return `F\xE2sit giren: umulan ${M(I.values[0])}`;
                return `F\xE2sit tercih: m\xFBteberler ${X(I.values, '|')}`;
            case 'too_big': {
                let P = I.inclusive ? '<=' : '<',
                    S = v(I.origin);
                if (S)
                    return `Fazla b\xFCy\xFCk: ${I.origin ?? 'value'}, ${P}${I.maximum.toString()} ${S.unit ?? 'elements'} sahip olmal\u0131yd\u0131.`;
                return `Fazla b\xFCy\xFCk: ${I.origin ?? 'value'}, ${P}${I.maximum.toString()} olmal\u0131yd\u0131.`;
            }
            case 'too_small': {
                let P = I.inclusive ? '>=' : '>',
                    S = v(I.origin);
                if (S)
                    return `Fazla k\xFC\xE7\xFCk: ${I.origin}, ${P}${I.minimum.toString()} ${S.unit} sahip olmal\u0131yd\u0131.`;
                return `Fazla k\xFC\xE7\xFCk: ${I.origin}, ${P}${I.minimum.toString()} olmal\u0131yd\u0131.`;
            }
            case 'invalid_format': {
                let P = I;
                if (P.format === 'starts_with')
                    return `F\xE2sit metin: "${P.prefix}" ile ba\u015Flamal\u0131.`;
                if (P.format === 'ends_with')
                    return `F\xE2sit metin: "${P.suffix}" ile bitmeli.`;
                if (P.format === 'includes')
                    return `F\xE2sit metin: "${P.includes}" ihtiv\xE2 etmeli.`;
                if (P.format === 'regex')
                    return `F\xE2sit metin: ${P.pattern} nak\u015F\u0131na uymal\u0131.`;
                return `F\xE2sit ${N[P.format] ?? I.format}`;
            }
            case 'not_multiple_of':
                return `F\xE2sit say\u0131: ${I.divisor} kat\u0131 olmal\u0131yd\u0131.`;
            case 'unrecognized_keys':
                return `Tan\u0131nmayan anahtar ${I.keys.length > 1 ? 's' : ''}: ${X(I.keys, ', ')}`;
            case 'invalid_key':
                return `${I.origin} i\xE7in tan\u0131nmayan anahtar var.`;
            case 'invalid_union':
                return 'Giren tan\u0131namad\u0131.';
            case 'invalid_element':
                return `${I.origin} i\xE7in tan\u0131nmayan k\u0131ymet var.`;
            default:
                return 'K\u0131ymet tan\u0131namad\u0131.';
        }
    };
};
function yU() {
    return { localeError: bD() };
}
var uD = () => {
    let $ = {
        string: {
            unit: '\u062A\u0648\u06A9\u064A',
            verb: '\u0648\u0644\u0631\u064A',
        },
        file: {
            unit: '\u0628\u0627\u06CC\u067C\u0633',
            verb: '\u0648\u0644\u0631\u064A',
        },
        array: {
            unit: '\u062A\u0648\u06A9\u064A',
            verb: '\u0648\u0644\u0631\u064A',
        },
        set: {
            unit: '\u062A\u0648\u06A9\u064A',
            verb: '\u0648\u0644\u0631\u064A',
        },
    };
    function v(I) {
        return $[I] ?? null;
    }
    let U = (I) => {
            let P = typeof I;
            switch (P) {
                case 'number':
                    return Number.isNaN(I) ? 'NaN' : '\u0639\u062F\u062F';
                case 'object': {
                    if (Array.isArray(I)) return '\u0627\u0631\u06D0';
                    if (I === null) return 'null';
                    if (
                        Object.getPrototypeOf(I) !== Object.prototype &&
                        I.constructor
                    )
                        return I.constructor.name;
                }
            }
            return P;
        },
        N = {
            regex: '\u0648\u0631\u0648\u062F\u064A',
            email: '\u0628\u0631\u06CC\u069A\u0646\u0627\u0644\u06CC\u06A9',
            url: '\u06CC\u0648 \u0622\u0631 \u0627\u0644',
            emoji: '\u0627\u06CC\u0645\u0648\u062C\u064A',
            uuid: 'UUID',
            uuidv4: 'UUIDv4',
            uuidv6: 'UUIDv6',
            nanoid: 'nanoid',
            guid: 'GUID',
            cuid: 'cuid',
            cuid2: 'cuid2',
            ulid: 'ULID',
            xid: 'XID',
            ksuid: 'KSUID',
            datetime:
                '\u0646\u06CC\u067C\u0647 \u0627\u0648 \u0648\u062E\u062A',
            date: '\u0646\u06D0\u067C\u0647',
            time: '\u0648\u062E\u062A',
            duration: '\u0645\u0648\u062F\u0647',
            ipv4: '\u062F IPv4 \u067E\u062A\u0647',
            ipv6: '\u062F IPv6 \u067E\u062A\u0647',
            cidrv4: '\u062F IPv4 \u0633\u0627\u062D\u0647',
            cidrv6: '\u062F IPv6 \u0633\u0627\u062D\u0647',
            base64: 'base64-encoded \u0645\u062A\u0646',
            base64url: 'base64url-encoded \u0645\u062A\u0646',
            json_string: 'JSON \u0645\u062A\u0646',
            e164: '\u062F E.164 \u0634\u0645\u06D0\u0631\u0647',
            jwt: 'JWT',
            template_literal: '\u0648\u0631\u0648\u062F\u064A',
        };
    return (I) => {
        switch (I.code) {
            case 'invalid_type':
                return `\u0646\u0627\u0633\u0645 \u0648\u0631\u0648\u062F\u064A: \u0628\u0627\u06CC\u062F ${I.expected} \u0648\u0627\u06CC, \u0645\u06AB\u0631 ${U(I.input)} \u062A\u0631\u0644\u0627\u0633\u0647 \u0634\u0648`;
            case 'invalid_value':
                if (I.values.length === 1)
                    return `\u0646\u0627\u0633\u0645 \u0648\u0631\u0648\u062F\u064A: \u0628\u0627\u06CC\u062F ${M(I.values[0])} \u0648\u0627\u06CC`;
                return `\u0646\u0627\u0633\u0645 \u0627\u0646\u062A\u062E\u0627\u0628: \u0628\u0627\u06CC\u062F \u06CC\u0648 \u0644\u0647 ${X(I.values, '|')} \u0685\u062E\u0647 \u0648\u0627\u06CC`;
            case 'too_big': {
                let P = I.inclusive ? '<=' : '<',
                    S = v(I.origin);
                if (S)
                    return `\u0689\u06CC\u0631 \u0644\u0648\u06CC: ${I.origin ?? '\u0627\u0631\u0632\u069A\u062A'} \u0628\u0627\u06CC\u062F ${P}${I.maximum.toString()} ${S.unit ?? '\u0639\u0646\u0635\u0631\u0648\u0646\u0647'} \u0648\u0644\u0631\u064A`;
                return `\u0689\u06CC\u0631 \u0644\u0648\u06CC: ${I.origin ?? '\u0627\u0631\u0632\u069A\u062A'} \u0628\u0627\u06CC\u062F ${P}${I.maximum.toString()} \u0648\u064A`;
            }
            case 'too_small': {
                let P = I.inclusive ? '>=' : '>',
                    S = v(I.origin);
                if (S)
                    return `\u0689\u06CC\u0631 \u06A9\u0648\u0686\u0646\u06CC: ${I.origin} \u0628\u0627\u06CC\u062F ${P}${I.minimum.toString()} ${S.unit} \u0648\u0644\u0631\u064A`;
                return `\u0689\u06CC\u0631 \u06A9\u0648\u0686\u0646\u06CC: ${I.origin} \u0628\u0627\u06CC\u062F ${P}${I.minimum.toString()} \u0648\u064A`;
            }
            case 'invalid_format': {
                let P = I;
                if (P.format === 'starts_with')
                    return `\u0646\u0627\u0633\u0645 \u0645\u062A\u0646: \u0628\u0627\u06CC\u062F \u062F "${P.prefix}" \u0633\u0631\u0647 \u067E\u06CC\u0644 \u0634\u064A`;
                if (P.format === 'ends_with')
                    return `\u0646\u0627\u0633\u0645 \u0645\u062A\u0646: \u0628\u0627\u06CC\u062F \u062F "${P.suffix}" \u0633\u0631\u0647 \u067E\u0627\u06CC \u062A\u0647 \u0648\u0631\u0633\u064A\u0696\u064A`;
                if (P.format === 'includes')
                    return `\u0646\u0627\u0633\u0645 \u0645\u062A\u0646: \u0628\u0627\u06CC\u062F "${P.includes}" \u0648\u0644\u0631\u064A`;
                if (P.format === 'regex')
                    return `\u0646\u0627\u0633\u0645 \u0645\u062A\u0646: \u0628\u0627\u06CC\u062F \u062F ${P.pattern} \u0633\u0631\u0647 \u0645\u0637\u0627\u0628\u0642\u062A \u0648\u0644\u0631\u064A`;
                return `${N[P.format] ?? I.format} \u0646\u0627\u0633\u0645 \u062F\u06CC`;
            }
            case 'not_multiple_of':
                return `\u0646\u0627\u0633\u0645 \u0639\u062F\u062F: \u0628\u0627\u06CC\u062F \u062F ${I.divisor} \u0645\u0636\u0631\u0628 \u0648\u064A`;
            case 'unrecognized_keys':
                return `\u0646\u0627\u0633\u0645 ${I.keys.length > 1 ? '\u06A9\u0644\u06CC\u0689\u0648\u0646\u0647' : '\u06A9\u0644\u06CC\u0689'}: ${X(I.keys, ', ')}`;
            case 'invalid_key':
                return `\u0646\u0627\u0633\u0645 \u06A9\u0644\u06CC\u0689 \u067E\u0647 ${I.origin} \u06A9\u06D0`;
            case 'invalid_union':
                return '\u0646\u0627\u0633\u0645\u0647 \u0648\u0631\u0648\u062F\u064A';
            case 'invalid_element':
                return `\u0646\u0627\u0633\u0645 \u0639\u0646\u0635\u0631 \u067E\u0647 ${I.origin} \u06A9\u06D0`;
            default:
                return '\u0646\u0627\u0633\u0645\u0647 \u0648\u0631\u0648\u062F\u064A';
        }
    };
};
function hU() {
    return { localeError: uD() };
}
var cD = () => {
    let $ = {
        string: { unit: 'znak\xF3w', verb: 'mie\u0107' },
        file: { unit: 'bajt\xF3w', verb: 'mie\u0107' },
        array: { unit: 'element\xF3w', verb: 'mie\u0107' },
        set: { unit: 'element\xF3w', verb: 'mie\u0107' },
    };
    function v(I) {
        return $[I] ?? null;
    }
    let U = (I) => {
            let P = typeof I;
            switch (P) {
                case 'number':
                    return Number.isNaN(I) ? 'NaN' : 'liczba';
                case 'object': {
                    if (Array.isArray(I)) return 'tablica';
                    if (I === null) return 'null';
                    if (
                        Object.getPrototypeOf(I) !== Object.prototype &&
                        I.constructor
                    )
                        return I.constructor.name;
                }
            }
            return P;
        },
        N = {
            regex: 'wyra\u017Cenie',
            email: 'adres email',
            url: 'URL',
            emoji: 'emoji',
            uuid: 'UUID',
            uuidv4: 'UUIDv4',
            uuidv6: 'UUIDv6',
            nanoid: 'nanoid',
            guid: 'GUID',
            cuid: 'cuid',
            cuid2: 'cuid2',
            ulid: 'ULID',
            xid: 'XID',
            ksuid: 'KSUID',
            datetime: 'data i godzina w formacie ISO',
            date: 'data w formacie ISO',
            time: 'godzina w formacie ISO',
            duration: 'czas trwania ISO',
            ipv4: 'adres IPv4',
            ipv6: 'adres IPv6',
            cidrv4: 'zakres IPv4',
            cidrv6: 'zakres IPv6',
            base64: 'ci\u0105g znak\xF3w zakodowany w formacie base64',
            base64url: 'ci\u0105g znak\xF3w zakodowany w formacie base64url',
            json_string: 'ci\u0105g znak\xF3w w formacie JSON',
            e164: 'liczba E.164',
            jwt: 'JWT',
            template_literal: 'wej\u015Bcie',
        };
    return (I) => {
        switch (I.code) {
            case 'invalid_type':
                return `Nieprawid\u0142owe dane wej\u015Bciowe: oczekiwano ${I.expected}, otrzymano ${U(I.input)}`;
            case 'invalid_value':
                if (I.values.length === 1)
                    return `Nieprawid\u0142owe dane wej\u015Bciowe: oczekiwano ${M(I.values[0])}`;
                return `Nieprawid\u0142owa opcja: oczekiwano jednej z warto\u015Bci ${X(I.values, '|')}`;
            case 'too_big': {
                let P = I.inclusive ? '<=' : '<',
                    S = v(I.origin);
                if (S)
                    return `Za du\u017Ca warto\u015B\u0107: oczekiwano, \u017Ce ${I.origin ?? 'warto\u015B\u0107'} b\u0119dzie mie\u0107 ${P}${I.maximum.toString()} ${S.unit ?? 'element\xF3w'}`;
                return `Zbyt du\u017C(y/a/e): oczekiwano, \u017Ce ${I.origin ?? 'warto\u015B\u0107'} b\u0119dzie wynosi\u0107 ${P}${I.maximum.toString()}`;
            }
            case 'too_small': {
                let P = I.inclusive ? '>=' : '>',
                    S = v(I.origin);
                if (S)
                    return `Za ma\u0142a warto\u015B\u0107: oczekiwano, \u017Ce ${I.origin ?? 'warto\u015B\u0107'} b\u0119dzie mie\u0107 ${P}${I.minimum.toString()} ${S.unit ?? 'element\xF3w'}`;
                return `Zbyt ma\u0142(y/a/e): oczekiwano, \u017Ce ${I.origin ?? 'warto\u015B\u0107'} b\u0119dzie wynosi\u0107 ${P}${I.minimum.toString()}`;
            }
            case 'invalid_format': {
                let P = I;
                if (P.format === 'starts_with')
                    return `Nieprawid\u0142owy ci\u0105g znak\xF3w: musi zaczyna\u0107 si\u0119 od "${P.prefix}"`;
                if (P.format === 'ends_with')
                    return `Nieprawid\u0142owy ci\u0105g znak\xF3w: musi ko\u0144czy\u0107 si\u0119 na "${P.suffix}"`;
                if (P.format === 'includes')
                    return `Nieprawid\u0142owy ci\u0105g znak\xF3w: musi zawiera\u0107 "${P.includes}"`;
                if (P.format === 'regex')
                    return `Nieprawid\u0142owy ci\u0105g znak\xF3w: musi odpowiada\u0107 wzorcowi ${P.pattern}`;
                return `Nieprawid\u0142ow(y/a/e) ${N[P.format] ?? I.format}`;
            }
            case 'not_multiple_of':
                return `Nieprawid\u0142owa liczba: musi by\u0107 wielokrotno\u015Bci\u0105 ${I.divisor}`;
            case 'unrecognized_keys':
                return `Nierozpoznane klucze${I.keys.length > 1 ? 's' : ''}: ${X(I.keys, ', ')}`;
            case 'invalid_key':
                return `Nieprawid\u0142owy klucz w ${I.origin}`;
            case 'invalid_union':
                return 'Nieprawid\u0142owe dane wej\u015Bciowe';
            case 'invalid_element':
                return `Nieprawid\u0142owa warto\u015B\u0107 w ${I.origin}`;
            default:
                return 'Nieprawid\u0142owe dane wej\u015Bciowe';
        }
    };
};
function _U() {
    return { localeError: cD() };
}
var FD = () => {
    let $ = {
        string: { unit: 'caracteres', verb: 'ter' },
        file: { unit: 'bytes', verb: 'ter' },
        array: { unit: 'itens', verb: 'ter' },
        set: { unit: 'itens', verb: 'ter' },
    };
    function v(I) {
        return $[I] ?? null;
    }
    let U = (I) => {
            let P = typeof I;
            switch (P) {
                case 'number':
                    return Number.isNaN(I) ? 'NaN' : 'n\xFAmero';
                case 'object': {
                    if (Array.isArray(I)) return 'array';
                    if (I === null) return 'nulo';
                    if (
                        Object.getPrototypeOf(I) !== Object.prototype &&
                        I.constructor
                    )
                        return I.constructor.name;
                }
            }
            return P;
        },
        N = {
            regex: 'padr\xE3o',
            email: 'endere\xE7o de e-mail',
            url: 'URL',
            emoji: 'emoji',
            uuid: 'UUID',
            uuidv4: 'UUIDv4',
            uuidv6: 'UUIDv6',
            nanoid: 'nanoid',
            guid: 'GUID',
            cuid: 'cuid',
            cuid2: 'cuid2',
            ulid: 'ULID',
            xid: 'XID',
            ksuid: 'KSUID',
            datetime: 'data e hora ISO',
            date: 'data ISO',
            time: 'hora ISO',
            duration: 'dura\xE7\xE3o ISO',
            ipv4: 'endere\xE7o IPv4',
            ipv6: 'endere\xE7o IPv6',
            cidrv4: 'faixa de IPv4',
            cidrv6: 'faixa de IPv6',
            base64: 'texto codificado em base64',
            base64url: 'URL codificada em base64',
            json_string: 'texto JSON',
            e164: 'n\xFAmero E.164',
            jwt: 'JWT',
            template_literal: 'entrada',
        };
    return (I) => {
        switch (I.code) {
            case 'invalid_type':
                return `Tipo inv\xE1lido: esperado ${I.expected}, recebido ${U(I.input)}`;
            case 'invalid_value':
                if (I.values.length === 1)
                    return `Entrada inv\xE1lida: esperado ${M(I.values[0])}`;
                return `Op\xE7\xE3o inv\xE1lida: esperada uma das ${X(I.values, '|')}`;
            case 'too_big': {
                let P = I.inclusive ? '<=' : '<',
                    S = v(I.origin);
                if (S)
                    return `Muito grande: esperado que ${I.origin ?? 'valor'} tivesse ${P}${I.maximum.toString()} ${S.unit ?? 'elementos'}`;
                return `Muito grande: esperado que ${I.origin ?? 'valor'} fosse ${P}${I.maximum.toString()}`;
            }
            case 'too_small': {
                let P = I.inclusive ? '>=' : '>',
                    S = v(I.origin);
                if (S)
                    return `Muito pequeno: esperado que ${I.origin} tivesse ${P}${I.minimum.toString()} ${S.unit}`;
                return `Muito pequeno: esperado que ${I.origin} fosse ${P}${I.minimum.toString()}`;
            }
            case 'invalid_format': {
                let P = I;
                if (P.format === 'starts_with')
                    return `Texto inv\xE1lido: deve come\xE7ar com "${P.prefix}"`;
                if (P.format === 'ends_with')
                    return `Texto inv\xE1lido: deve terminar com "${P.suffix}"`;
                if (P.format === 'includes')
                    return `Texto inv\xE1lido: deve incluir "${P.includes}"`;
                if (P.format === 'regex')
                    return `Texto inv\xE1lido: deve corresponder ao padr\xE3o ${P.pattern}`;
                return `${N[P.format] ?? I.format} inv\xE1lido`;
            }
            case 'not_multiple_of':
                return `N\xFAmero inv\xE1lido: deve ser m\xFAltiplo de ${I.divisor}`;
            case 'unrecognized_keys':
                return `Chave${I.keys.length > 1 ? 's' : ''} desconhecida${I.keys.length > 1 ? 's' : ''}: ${X(I.keys, ', ')}`;
            case 'invalid_key':
                return `Chave inv\xE1lida em ${I.origin}`;
            case 'invalid_union':
                return 'Entrada inv\xE1lida';
            case 'invalid_element':
                return `Valor inv\xE1lido em ${I.origin}`;
            default:
                return 'Campo inv\xE1lido';
        }
    };
};
function oU() {
    return { localeError: FD() };
}
function xS($, v, U, N) {
    let I = Math.abs($),
        P = I % 10,
        S = I % 100;
    if (S >= 11 && S <= 19) return N;
    if (P === 1) return v;
    if (P >= 2 && P <= 4) return U;
    return N;
}
var ED = () => {
    let $ = {
        string: {
            unit: {
                one: '\u0441\u0438\u043C\u0432\u043E\u043B',
                few: '\u0441\u0438\u043C\u0432\u043E\u043B\u0430',
                many: '\u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432',
            },
            verb: '\u0438\u043C\u0435\u0442\u044C',
        },
        file: {
            unit: {
                one: '\u0431\u0430\u0439\u0442',
                few: '\u0431\u0430\u0439\u0442\u0430',
                many: '\u0431\u0430\u0439\u0442',
            },
            verb: '\u0438\u043C\u0435\u0442\u044C',
        },
        array: {
            unit: {
                one: '\u044D\u043B\u0435\u043C\u0435\u043D\u0442',
                few: '\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430',
                many: '\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u043E\u0432',
            },
            verb: '\u0438\u043C\u0435\u0442\u044C',
        },
        set: {
            unit: {
                one: '\u044D\u043B\u0435\u043C\u0435\u043D\u0442',
                few: '\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430',
                many: '\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u043E\u0432',
            },
            verb: '\u0438\u043C\u0435\u0442\u044C',
        },
    };
    function v(I) {
        return $[I] ?? null;
    }
    let U = (I) => {
            let P = typeof I;
            switch (P) {
                case 'number':
                    return Number.isNaN(I)
                        ? 'NaN'
                        : '\u0447\u0438\u0441\u043B\u043E';
                case 'object': {
                    if (Array.isArray(I))
                        return '\u043C\u0430\u0441\u0441\u0438\u0432';
                    if (I === null) return 'null';
                    if (
                        Object.getPrototypeOf(I) !== Object.prototype &&
                        I.constructor
                    )
                        return I.constructor.name;
                }
            }
            return P;
        },
        N = {
            regex: '\u0432\u0432\u043E\u0434',
            email: 'email \u0430\u0434\u0440\u0435\u0441',
            url: 'URL',
            emoji: '\u044D\u043C\u043E\u0434\u0437\u0438',
            uuid: 'UUID',
            uuidv4: 'UUIDv4',
            uuidv6: 'UUIDv6',
            nanoid: 'nanoid',
            guid: 'GUID',
            cuid: 'cuid',
            cuid2: 'cuid2',
            ulid: 'ULID',
            xid: 'XID',
            ksuid: 'KSUID',
            datetime:
                'ISO \u0434\u0430\u0442\u0430 \u0438 \u0432\u0440\u0435\u043C\u044F',
            date: 'ISO \u0434\u0430\u0442\u0430',
            time: 'ISO \u0432\u0440\u0435\u043C\u044F',
            duration:
                'ISO \u0434\u043B\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C',
            ipv4: 'IPv4 \u0430\u0434\u0440\u0435\u0441',
            ipv6: 'IPv6 \u0430\u0434\u0440\u0435\u0441',
            cidrv4: 'IPv4 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D',
            cidrv6: 'IPv6 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D',
            base64: '\u0441\u0442\u0440\u043E\u043A\u0430 \u0432 \u0444\u043E\u0440\u043C\u0430\u0442\u0435 base64',
            base64url:
                '\u0441\u0442\u0440\u043E\u043A\u0430 \u0432 \u0444\u043E\u0440\u043C\u0430\u0442\u0435 base64url',
            json_string: 'JSON \u0441\u0442\u0440\u043E\u043A\u0430',
            e164: '\u043D\u043E\u043C\u0435\u0440 E.164',
            jwt: 'JWT',
            template_literal: '\u0432\u0432\u043E\u0434',
        };
    return (I) => {
        switch (I.code) {
            case 'invalid_type':
                return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0432\u0432\u043E\u0434: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C ${I.expected}, \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u043E ${U(I.input)}`;
            case 'invalid_value':
                if (I.values.length === 1)
                    return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0432\u0432\u043E\u0434: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C ${M(I.values[0])}`;
                return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0432\u0430\u0440\u0438\u0430\u043D\u0442: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0434\u043D\u043E \u0438\u0437 ${X(I.values, '|')}`;
            case 'too_big': {
                let P = I.inclusive ? '<=' : '<',
                    S = v(I.origin);
                if (S) {
                    let O = Number(I.maximum),
                        J = xS(O, S.unit.one, S.unit.few, S.unit.many);
                    return `\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u0431\u043E\u043B\u044C\u0448\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C, \u0447\u0442\u043E ${I.origin ?? '\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435'} \u0431\u0443\u0434\u0435\u0442 \u0438\u043C\u0435\u0442\u044C ${P}${I.maximum.toString()} ${J}`;
                }
                return `\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u0431\u043E\u043B\u044C\u0448\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C, \u0447\u0442\u043E ${I.origin ?? '\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435'} \u0431\u0443\u0434\u0435\u0442 ${P}${I.maximum.toString()}`;
            }
            case 'too_small': {
                let P = I.inclusive ? '>=' : '>',
                    S = v(I.origin);
                if (S) {
                    let O = Number(I.minimum),
                        J = xS(O, S.unit.one, S.unit.few, S.unit.many);
                    return `\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u043C\u0430\u043B\u0435\u043D\u044C\u043A\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C, \u0447\u0442\u043E ${I.origin} \u0431\u0443\u0434\u0435\u0442 \u0438\u043C\u0435\u0442\u044C ${P}${I.minimum.toString()} ${J}`;
                }
                return `\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u043C\u0430\u043B\u0435\u043D\u044C\u043A\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C, \u0447\u0442\u043E ${I.origin} \u0431\u0443\u0434\u0435\u0442 ${P}${I.minimum.toString()}`;
            }
            case 'invalid_format': {
                let P = I;
                if (P.format === 'starts_with')
                    return `\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430: \u0434\u043E\u043B\u0436\u043D\u0430 \u043D\u0430\u0447\u0438\u043D\u0430\u0442\u044C\u0441\u044F \u0441 "${P.prefix}"`;
                if (P.format === 'ends_with')
                    return `\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430: \u0434\u043E\u043B\u0436\u043D\u0430 \u0437\u0430\u043A\u0430\u043D\u0447\u0438\u0432\u0430\u0442\u044C\u0441\u044F \u043D\u0430 "${P.suffix}"`;
                if (P.format === 'includes')
                    return `\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430: \u0434\u043E\u043B\u0436\u043D\u0430 \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C "${P.includes}"`;
                if (P.format === 'regex')
                    return `\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430: \u0434\u043E\u043B\u0436\u043D\u0430 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u043E\u0432\u0430\u0442\u044C \u0448\u0430\u0431\u043B\u043E\u043D\u0443 ${P.pattern}`;
                return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 ${N[P.format] ?? I.format}`;
            }
            case 'not_multiple_of':
                return `\u041D\u0435\u0432\u0435\u0440\u043D\u043E\u0435 \u0447\u0438\u0441\u043B\u043E: \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u043A\u0440\u0430\u0442\u043D\u044B\u043C ${I.divisor}`;
            case 'unrecognized_keys':
                return `\u041D\u0435\u0440\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u043D\u043D${I.keys.length > 1 ? '\u044B\u0435' : '\u044B\u0439'} \u043A\u043B\u044E\u0447${I.keys.length > 1 ? '\u0438' : ''}: ${X(I.keys, ', ')}`;
            case 'invalid_key':
                return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u043A\u043B\u044E\u0447 \u0432 ${I.origin}`;
            case 'invalid_union':
                return '\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0435 \u0432\u0445\u043E\u0434\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435';
            case 'invalid_element':
                return `\u041D\u0435\u0432\u0435\u0440\u043D\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u0432 ${I.origin}`;
            default:
                return '\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0435 \u0432\u0445\u043E\u0434\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435';
        }
    };
};
function lU() {
    return { localeError: ED() };
}
var qD = () => {
    let $ = {
        string: { unit: 'znakov', verb: 'imeti' },
        file: { unit: 'bajtov', verb: 'imeti' },
        array: { unit: 'elementov', verb: 'imeti' },
        set: { unit: 'elementov', verb: 'imeti' },
    };
    function v(I) {
        return $[I] ?? null;
    }
    let U = (I) => {
            let P = typeof I;
            switch (P) {
                case 'number':
                    return Number.isNaN(I) ? 'NaN' : '\u0161tevilo';
                case 'object': {
                    if (Array.isArray(I)) return 'tabela';
                    if (I === null) return 'null';
                    if (
                        Object.getPrototypeOf(I) !== Object.prototype &&
                        I.constructor
                    )
                        return I.constructor.name;
                }
            }
            return P;
        },
        N = {
            regex: 'vnos',
            email: 'e-po\u0161tni naslov',
            url: 'URL',
            emoji: 'emoji',
            uuid: 'UUID',
            uuidv4: 'UUIDv4',
            uuidv6: 'UUIDv6',
            nanoid: 'nanoid',
            guid: 'GUID',
            cuid: 'cuid',
            cuid2: 'cuid2',
            ulid: 'ULID',
            xid: 'XID',
            ksuid: 'KSUID',
            datetime: 'ISO datum in \u010Das',
            date: 'ISO datum',
            time: 'ISO \u010Das',
            duration: 'ISO trajanje',
            ipv4: 'IPv4 naslov',
            ipv6: 'IPv6 naslov',
            cidrv4: 'obseg IPv4',
            cidrv6: 'obseg IPv6',
            base64: 'base64 kodiran niz',
            base64url: 'base64url kodiran niz',
            json_string: 'JSON niz',
            e164: 'E.164 \u0161tevilka',
            jwt: 'JWT',
            template_literal: 'vnos',
        };
    return (I) => {
        switch (I.code) {
            case 'invalid_type':
                return `Neveljaven vnos: pri\u010Dakovano ${I.expected}, prejeto ${U(I.input)}`;
            case 'invalid_value':
                if (I.values.length === 1)
                    return `Neveljaven vnos: pri\u010Dakovano ${M(I.values[0])}`;
                return `Neveljavna mo\u017Enost: pri\u010Dakovano eno izmed ${X(I.values, '|')}`;
            case 'too_big': {
                let P = I.inclusive ? '<=' : '<',
                    S = v(I.origin);
                if (S)
                    return `Preveliko: pri\u010Dakovano, da bo ${I.origin ?? 'vrednost'} imelo ${P}${I.maximum.toString()} ${S.unit ?? 'elementov'}`;
                return `Preveliko: pri\u010Dakovano, da bo ${I.origin ?? 'vrednost'} ${P}${I.maximum.toString()}`;
            }
            case 'too_small': {
                let P = I.inclusive ? '>=' : '>',
                    S = v(I.origin);
                if (S)
                    return `Premajhno: pri\u010Dakovano, da bo ${I.origin} imelo ${P}${I.minimum.toString()} ${S.unit}`;
                return `Premajhno: pri\u010Dakovano, da bo ${I.origin} ${P}${I.minimum.toString()}`;
            }
            case 'invalid_format': {
                let P = I;
                if (P.format === 'starts_with')
                    return `Neveljaven niz: mora se za\u010Deti z "${P.prefix}"`;
                if (P.format === 'ends_with')
                    return `Neveljaven niz: mora se kon\u010Dati z "${P.suffix}"`;
                if (P.format === 'includes')
                    return `Neveljaven niz: mora vsebovati "${P.includes}"`;
                if (P.format === 'regex')
                    return `Neveljaven niz: mora ustrezati vzorcu ${P.pattern}`;
                return `Neveljaven ${N[P.format] ?? I.format}`;
            }
            case 'not_multiple_of':
                return `Neveljavno \u0161tevilo: mora biti ve\u010Dkratnik ${I.divisor}`;
            case 'unrecognized_keys':
                return `Neprepoznan${I.keys.length > 1 ? 'i klju\u010Di' : ' klju\u010D'}: ${X(I.keys, ', ')}`;
            case 'invalid_key':
                return `Neveljaven klju\u010D v ${I.origin}`;
            case 'invalid_union':
                return 'Neveljaven vnos';
            case 'invalid_element':
                return `Neveljavna vrednost v ${I.origin}`;
            default:
                return 'Neveljaven vnos';
        }
    };
};
function pU() {
    return { localeError: qD() };
}
var kD = () => {
    let $ = {
        string: { unit: 'tecken', verb: 'att ha' },
        file: { unit: 'bytes', verb: 'att ha' },
        array: { unit: 'objekt', verb: 'att inneh\xE5lla' },
        set: { unit: 'objekt', verb: 'att inneh\xE5lla' },
    };
    function v(I) {
        return $[I] ?? null;
    }
    let U = (I) => {
            let P = typeof I;
            switch (P) {
                case 'number':
                    return Number.isNaN(I) ? 'NaN' : 'antal';
                case 'object': {
                    if (Array.isArray(I)) return 'lista';
                    if (I === null) return 'null';
                    if (
                        Object.getPrototypeOf(I) !== Object.prototype &&
                        I.constructor
                    )
                        return I.constructor.name;
                }
            }
            return P;
        },
        N = {
            regex: 'regulj\xE4rt uttryck',
            email: 'e-postadress',
            url: 'URL',
            emoji: 'emoji',
            uuid: 'UUID',
            uuidv4: 'UUIDv4',
            uuidv6: 'UUIDv6',
            nanoid: 'nanoid',
            guid: 'GUID',
            cuid: 'cuid',
            cuid2: 'cuid2',
            ulid: 'ULID',
            xid: 'XID',
            ksuid: 'KSUID',
            datetime: 'ISO-datum och tid',
            date: 'ISO-datum',
            time: 'ISO-tid',
            duration: 'ISO-varaktighet',
            ipv4: 'IPv4-intervall',
            ipv6: 'IPv6-intervall',
            cidrv4: 'IPv4-spektrum',
            cidrv6: 'IPv6-spektrum',
            base64: 'base64-kodad str\xE4ng',
            base64url: 'base64url-kodad str\xE4ng',
            json_string: 'JSON-str\xE4ng',
            e164: 'E.164-nummer',
            jwt: 'JWT',
            template_literal: 'mall-literal',
        };
    return (I) => {
        switch (I.code) {
            case 'invalid_type':
                return `Ogiltig inmatning: f\xF6rv\xE4ntat ${I.expected}, fick ${U(I.input)}`;
            case 'invalid_value':
                if (I.values.length === 1)
                    return `Ogiltig inmatning: f\xF6rv\xE4ntat ${M(I.values[0])}`;
                return `Ogiltigt val: f\xF6rv\xE4ntade en av ${X(I.values, '|')}`;
            case 'too_big': {
                let P = I.inclusive ? '<=' : '<',
                    S = v(I.origin);
                if (S)
                    return `F\xF6r stor(t): f\xF6rv\xE4ntade ${I.origin ?? 'v\xE4rdet'} att ha ${P}${I.maximum.toString()} ${S.unit ?? 'element'}`;
                return `F\xF6r stor(t): f\xF6rv\xE4ntat ${I.origin ?? 'v\xE4rdet'} att ha ${P}${I.maximum.toString()}`;
            }
            case 'too_small': {
                let P = I.inclusive ? '>=' : '>',
                    S = v(I.origin);
                if (S)
                    return `F\xF6r lite(t): f\xF6rv\xE4ntade ${I.origin ?? 'v\xE4rdet'} att ha ${P}${I.minimum.toString()} ${S.unit}`;
                return `F\xF6r lite(t): f\xF6rv\xE4ntade ${I.origin ?? 'v\xE4rdet'} att ha ${P}${I.minimum.toString()}`;
            }
            case 'invalid_format': {
                let P = I;
                if (P.format === 'starts_with')
                    return `Ogiltig str\xE4ng: m\xE5ste b\xF6rja med "${P.prefix}"`;
                if (P.format === 'ends_with')
                    return `Ogiltig str\xE4ng: m\xE5ste sluta med "${P.suffix}"`;
                if (P.format === 'includes')
                    return `Ogiltig str\xE4ng: m\xE5ste inneh\xE5lla "${P.includes}"`;
                if (P.format === 'regex')
                    return `Ogiltig str\xE4ng: m\xE5ste matcha m\xF6nstret "${P.pattern}"`;
                return `Ogiltig(t) ${N[P.format] ?? I.format}`;
            }
            case 'not_multiple_of':
                return `Ogiltigt tal: m\xE5ste vara en multipel av ${I.divisor}`;
            case 'unrecognized_keys':
                return `${I.keys.length > 1 ? 'Ok\xE4nda nycklar' : 'Ok\xE4nd nyckel'}: ${X(I.keys, ', ')}`;
            case 'invalid_key':
                return `Ogiltig nyckel i ${I.origin ?? 'v\xE4rdet'}`;
            case 'invalid_union':
                return 'Ogiltig input';
            case 'invalid_element':
                return `Ogiltigt v\xE4rde i ${I.origin ?? 'v\xE4rdet'}`;
            default:
                return 'Ogiltig input';
        }
    };
};
function iU() {
    return { localeError: kD() };
}
var ZD = () => {
    let $ = {
        string: {
            unit: '\u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0B95\u0BCD\u0B95\u0BB3\u0BCD',
            verb: '\u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD',
        },
        file: {
            unit: '\u0BAA\u0BC8\u0B9F\u0BCD\u0B9F\u0BC1\u0B95\u0BB3\u0BCD',
            verb: '\u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD',
        },
        array: {
            unit: '\u0B89\u0BB1\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1\u0B95\u0BB3\u0BCD',
            verb: '\u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD',
        },
        set: {
            unit: '\u0B89\u0BB1\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1\u0B95\u0BB3\u0BCD',
            verb: '\u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD',
        },
    };
    function v(I) {
        return $[I] ?? null;
    }
    let U = (I) => {
            let P = typeof I;
            switch (P) {
                case 'number':
                    return Number.isNaN(I)
                        ? '\u0B8E\u0BA3\u0BCD \u0B85\u0BB2\u0BCD\u0BB2\u0BBE\u0BA4\u0BA4\u0BC1'
                        : '\u0B8E\u0BA3\u0BCD';
                case 'object': {
                    if (Array.isArray(I)) return '\u0B85\u0BA3\u0BBF';
                    if (I === null)
                        return '\u0BB5\u0BC6\u0BB1\u0BC1\u0BAE\u0BC8';
                    if (
                        Object.getPrototypeOf(I) !== Object.prototype &&
                        I.constructor
                    )
                        return I.constructor.name;
                }
            }
            return P;
        },
        N = {
            regex: '\u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1',
            email: '\u0BAE\u0BBF\u0BA9\u0BCD\u0BA9\u0B9E\u0BCD\u0B9A\u0BB2\u0BCD \u0BAE\u0BC1\u0B95\u0BB5\u0BB0\u0BBF',
            url: 'URL',
            emoji: 'emoji',
            uuid: 'UUID',
            uuidv4: 'UUIDv4',
            uuidv6: 'UUIDv6',
            nanoid: 'nanoid',
            guid: 'GUID',
            cuid: 'cuid',
            cuid2: 'cuid2',
            ulid: 'ULID',
            xid: 'XID',
            ksuid: 'KSUID',
            datetime:
                'ISO \u0BA4\u0BC7\u0BA4\u0BBF \u0BA8\u0BC7\u0BB0\u0BAE\u0BCD',
            date: 'ISO \u0BA4\u0BC7\u0BA4\u0BBF',
            time: 'ISO \u0BA8\u0BC7\u0BB0\u0BAE\u0BCD',
            duration: 'ISO \u0B95\u0BBE\u0BB2 \u0B85\u0BB3\u0BB5\u0BC1',
            ipv4: 'IPv4 \u0BAE\u0BC1\u0B95\u0BB5\u0BB0\u0BBF',
            ipv6: 'IPv6 \u0BAE\u0BC1\u0B95\u0BB5\u0BB0\u0BBF',
            cidrv4: 'IPv4 \u0BB5\u0BB0\u0BAE\u0BCD\u0BAA\u0BC1',
            cidrv6: 'IPv6 \u0BB5\u0BB0\u0BAE\u0BCD\u0BAA\u0BC1',
            base64: 'base64-encoded \u0B9A\u0BB0\u0BAE\u0BCD',
            base64url: 'base64url-encoded \u0B9A\u0BB0\u0BAE\u0BCD',
            json_string: 'JSON \u0B9A\u0BB0\u0BAE\u0BCD',
            e164: 'E.164 \u0B8E\u0BA3\u0BCD',
            jwt: 'JWT',
            template_literal: 'input',
        };
    return (I) => {
        switch (I.code) {
            case 'invalid_type':
                return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${I.expected}, \u0BAA\u0BC6\u0BB1\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${U(I.input)}`;
            case 'invalid_value':
                if (I.values.length === 1)
                    return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${M(I.values[0])}`;
                return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0BB5\u0BBF\u0BB0\u0BC1\u0BAA\u0BCD\u0BAA\u0BAE\u0BCD: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${X(I.values, '|')} \u0B87\u0BB2\u0BCD \u0B92\u0BA9\u0BCD\u0BB1\u0BC1`;
            case 'too_big': {
                let P = I.inclusive ? '<=' : '<',
                    S = v(I.origin);
                if (S)
                    return `\u0BAE\u0BBF\u0B95 \u0BAA\u0BC6\u0BB0\u0BBF\u0BAF\u0BA4\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${I.origin ?? '\u0BAE\u0BA4\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1'} ${P}${I.maximum.toString()} ${S.unit ?? '\u0B89\u0BB1\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1\u0B95\u0BB3\u0BCD'} \u0B86\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
                return `\u0BAE\u0BBF\u0B95 \u0BAA\u0BC6\u0BB0\u0BBF\u0BAF\u0BA4\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${I.origin ?? '\u0BAE\u0BA4\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1'} ${P}${I.maximum.toString()} \u0B86\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
            }
            case 'too_small': {
                let P = I.inclusive ? '>=' : '>',
                    S = v(I.origin);
                if (S)
                    return `\u0BAE\u0BBF\u0B95\u0B9A\u0BCD \u0B9A\u0BBF\u0BB1\u0BBF\u0BAF\u0BA4\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${I.origin} ${P}${I.minimum.toString()} ${S.unit} \u0B86\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
                return `\u0BAE\u0BBF\u0B95\u0B9A\u0BCD \u0B9A\u0BBF\u0BB1\u0BBF\u0BAF\u0BA4\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${I.origin} ${P}${I.minimum.toString()} \u0B86\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
            }
            case 'invalid_format': {
                let P = I;
                if (P.format === 'starts_with')
                    return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B9A\u0BB0\u0BAE\u0BCD: "${P.prefix}" \u0B87\u0BB2\u0BCD \u0BA4\u0BCA\u0B9F\u0B99\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
                if (P.format === 'ends_with')
                    return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B9A\u0BB0\u0BAE\u0BCD: "${P.suffix}" \u0B87\u0BB2\u0BCD \u0BAE\u0BC1\u0B9F\u0BBF\u0BB5\u0B9F\u0BC8\u0BAF \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
                if (P.format === 'includes')
                    return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B9A\u0BB0\u0BAE\u0BCD: "${P.includes}" \u0B90 \u0B89\u0BB3\u0BCD\u0BB3\u0B9F\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
                if (P.format === 'regex')
                    return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B9A\u0BB0\u0BAE\u0BCD: ${P.pattern} \u0BAE\u0BC1\u0BB1\u0BC8\u0BAA\u0BBE\u0B9F\u0BCD\u0B9F\u0BC1\u0B9F\u0BA9\u0BCD \u0BAA\u0BCA\u0BB0\u0BC1\u0BA8\u0BCD\u0BA4 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
                return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 ${N[P.format] ?? I.format}`;
            }
            case 'not_multiple_of':
                return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B8E\u0BA3\u0BCD: ${I.divisor} \u0B87\u0BA9\u0BCD \u0BAA\u0BB2\u0BAE\u0BBE\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
            case 'unrecognized_keys':
                return `\u0B85\u0B9F\u0BC8\u0BAF\u0BBE\u0BB3\u0BAE\u0BCD \u0BA4\u0BC6\u0BB0\u0BBF\u0BAF\u0BBE\u0BA4 \u0BB5\u0BBF\u0B9A\u0BC8${I.keys.length > 1 ? '\u0B95\u0BB3\u0BCD' : ''}: ${X(I.keys, ', ')}`;
            case 'invalid_key':
                return `${I.origin} \u0B87\u0BB2\u0BCD \u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0BB5\u0BBF\u0B9A\u0BC8`;
            case 'invalid_union':
                return '\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1';
            case 'invalid_element':
                return `${I.origin} \u0B87\u0BB2\u0BCD \u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0BAE\u0BA4\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1`;
            default:
                return '\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1';
        }
    };
};
function tU() {
    return { localeError: ZD() };
}
var RD = () => {
    let $ = {
        string: {
            unit: '\u0E15\u0E31\u0E27\u0E2D\u0E31\u0E01\u0E29\u0E23',
            verb: '\u0E04\u0E27\u0E23\u0E21\u0E35',
        },
        file: {
            unit: '\u0E44\u0E1A\u0E15\u0E4C',
            verb: '\u0E04\u0E27\u0E23\u0E21\u0E35',
        },
        array: {
            unit: '\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23',
            verb: '\u0E04\u0E27\u0E23\u0E21\u0E35',
        },
        set: {
            unit: '\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23',
            verb: '\u0E04\u0E27\u0E23\u0E21\u0E35',
        },
    };
    function v(I) {
        return $[I] ?? null;
    }
    let U = (I) => {
            let P = typeof I;
            switch (P) {
                case 'number':
                    return Number.isNaN(I)
                        ? '\u0E44\u0E21\u0E48\u0E43\u0E0A\u0E48\u0E15\u0E31\u0E27\u0E40\u0E25\u0E02 (NaN)'
                        : '\u0E15\u0E31\u0E27\u0E40\u0E25\u0E02';
                case 'object': {
                    if (Array.isArray(I))
                        return '\u0E2D\u0E32\u0E23\u0E4C\u0E40\u0E23\u0E22\u0E4C (Array)';
                    if (I === null)
                        return '\u0E44\u0E21\u0E48\u0E21\u0E35\u0E04\u0E48\u0E32 (null)';
                    if (
                        Object.getPrototypeOf(I) !== Object.prototype &&
                        I.constructor
                    )
                        return I.constructor.name;
                }
            }
            return P;
        },
        N = {
            regex: '\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E35\u0E48\u0E1B\u0E49\u0E2D\u0E19',
            email: '\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48\u0E2D\u0E35\u0E40\u0E21\u0E25',
            url: 'URL',
            emoji: '\u0E2D\u0E34\u0E42\u0E21\u0E08\u0E34',
            uuid: 'UUID',
            uuidv4: 'UUIDv4',
            uuidv6: 'UUIDv6',
            nanoid: 'nanoid',
            guid: 'GUID',
            cuid: 'cuid',
            cuid2: 'cuid2',
            ulid: 'ULID',
            xid: 'XID',
            ksuid: 'KSUID',
            datetime:
                '\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E40\u0E27\u0E25\u0E32\u0E41\u0E1A\u0E1A ISO',
            date: '\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E41\u0E1A\u0E1A ISO',
            time: '\u0E40\u0E27\u0E25\u0E32\u0E41\u0E1A\u0E1A ISO',
            duration:
                '\u0E0A\u0E48\u0E27\u0E07\u0E40\u0E27\u0E25\u0E32\u0E41\u0E1A\u0E1A ISO',
            ipv4: '\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48 IPv4',
            ipv6: '\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48 IPv6',
            cidrv4: '\u0E0A\u0E48\u0E27\u0E07 IP \u0E41\u0E1A\u0E1A IPv4',
            cidrv6: '\u0E0A\u0E48\u0E27\u0E07 IP \u0E41\u0E1A\u0E1A IPv6',
            base64: '\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E41\u0E1A\u0E1A Base64',
            base64url:
                '\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E41\u0E1A\u0E1A Base64 \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A URL',
            json_string:
                '\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E41\u0E1A\u0E1A JSON',
            e164: '\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E42\u0E17\u0E23\u0E28\u0E31\u0E1E\u0E17\u0E4C\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E1B\u0E23\u0E30\u0E40\u0E17\u0E28 (E.164)',
            jwt: '\u0E42\u0E17\u0E40\u0E04\u0E19 JWT',
            template_literal:
                '\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E35\u0E48\u0E1B\u0E49\u0E2D\u0E19',
        };
    return (I) => {
        switch (I.code) {
            case 'invalid_type':
                return `\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E04\u0E27\u0E23\u0E40\u0E1B\u0E47\u0E19 ${I.expected} \u0E41\u0E15\u0E48\u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A ${U(I.input)}`;
            case 'invalid_value':
                if (I.values.length === 1)
                    return `\u0E04\u0E48\u0E32\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E04\u0E27\u0E23\u0E40\u0E1B\u0E47\u0E19 ${M(I.values[0])}`;
                return `\u0E15\u0E31\u0E27\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E04\u0E27\u0E23\u0E40\u0E1B\u0E47\u0E19\u0E2B\u0E19\u0E36\u0E48\u0E07\u0E43\u0E19 ${X(I.values, '|')}`;
            case 'too_big': {
                let P = I.inclusive
                        ? '\u0E44\u0E21\u0E48\u0E40\u0E01\u0E34\u0E19'
                        : '\u0E19\u0E49\u0E2D\u0E22\u0E01\u0E27\u0E48\u0E32',
                    S = v(I.origin);
                if (S)
                    return `\u0E40\u0E01\u0E34\u0E19\u0E01\u0E33\u0E2B\u0E19\u0E14: ${I.origin ?? '\u0E04\u0E48\u0E32'} \u0E04\u0E27\u0E23\u0E21\u0E35${P} ${I.maximum.toString()} ${S.unit ?? '\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23'}`;
                return `\u0E40\u0E01\u0E34\u0E19\u0E01\u0E33\u0E2B\u0E19\u0E14: ${I.origin ?? '\u0E04\u0E48\u0E32'} \u0E04\u0E27\u0E23\u0E21\u0E35${P} ${I.maximum.toString()}`;
            }
            case 'too_small': {
                let P = I.inclusive
                        ? '\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E19\u0E49\u0E2D\u0E22'
                        : '\u0E21\u0E32\u0E01\u0E01\u0E27\u0E48\u0E32',
                    S = v(I.origin);
                if (S)
                    return `\u0E19\u0E49\u0E2D\u0E22\u0E01\u0E27\u0E48\u0E32\u0E01\u0E33\u0E2B\u0E19\u0E14: ${I.origin} \u0E04\u0E27\u0E23\u0E21\u0E35${P} ${I.minimum.toString()} ${S.unit}`;
                return `\u0E19\u0E49\u0E2D\u0E22\u0E01\u0E27\u0E48\u0E32\u0E01\u0E33\u0E2B\u0E19\u0E14: ${I.origin} \u0E04\u0E27\u0E23\u0E21\u0E35${P} ${I.minimum.toString()}`;
            }
            case 'invalid_format': {
                let P = I;
                if (P.format === 'starts_with')
                    return `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E15\u0E49\u0E2D\u0E07\u0E02\u0E36\u0E49\u0E19\u0E15\u0E49\u0E19\u0E14\u0E49\u0E27\u0E22 "${P.prefix}"`;
                if (P.format === 'ends_with')
                    return `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E15\u0E49\u0E2D\u0E07\u0E25\u0E07\u0E17\u0E49\u0E32\u0E22\u0E14\u0E49\u0E27\u0E22 "${P.suffix}"`;
                if (P.format === 'includes')
                    return `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E15\u0E49\u0E2D\u0E07\u0E21\u0E35 "${P.includes}" \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21`;
                if (P.format === 'regex')
                    return `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E15\u0E49\u0E2D\u0E07\u0E15\u0E23\u0E07\u0E01\u0E31\u0E1A\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E17\u0E35\u0E48\u0E01\u0E33\u0E2B\u0E19\u0E14 ${P.pattern}`;
                return `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: ${N[P.format] ?? I.format}`;
            }
            case 'not_multiple_of':
                return `\u0E15\u0E31\u0E27\u0E40\u0E25\u0E02\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E15\u0E49\u0E2D\u0E07\u0E40\u0E1B\u0E47\u0E19\u0E08\u0E33\u0E19\u0E27\u0E19\u0E17\u0E35\u0E48\u0E2B\u0E32\u0E23\u0E14\u0E49\u0E27\u0E22 ${I.divisor} \u0E44\u0E14\u0E49\u0E25\u0E07\u0E15\u0E31\u0E27`;
            case 'unrecognized_keys':
                return `\u0E1E\u0E1A\u0E04\u0E35\u0E22\u0E4C\u0E17\u0E35\u0E48\u0E44\u0E21\u0E48\u0E23\u0E39\u0E49\u0E08\u0E31\u0E01: ${X(I.keys, ', ')}`;
            case 'invalid_key':
                return `\u0E04\u0E35\u0E22\u0E4C\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07\u0E43\u0E19 ${I.origin}`;
            case 'invalid_union':
                return '\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E44\u0E21\u0E48\u0E15\u0E23\u0E07\u0E01\u0E31\u0E1A\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E22\u0E39\u0E40\u0E19\u0E35\u0E22\u0E19\u0E17\u0E35\u0E48\u0E01\u0E33\u0E2B\u0E19\u0E14\u0E44\u0E27\u0E49';
            case 'invalid_element':
                return `\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07\u0E43\u0E19 ${I.origin}`;
            default:
                return '\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07';
        }
    };
};
function dU() {
    return { localeError: RD() };
}
var CD = ($) => {
        let v = typeof $;
        switch (v) {
            case 'number':
                return Number.isNaN($) ? 'NaN' : 'number';
            case 'object': {
                if (Array.isArray($)) return 'array';
                if ($ === null) return 'null';
                if (
                    Object.getPrototypeOf($) !== Object.prototype &&
                    $.constructor
                )
                    return $.constructor.name;
            }
        }
        return v;
    },
    rD = () => {
        let $ = {
            string: { unit: 'karakter', verb: 'olmal\u0131' },
            file: { unit: 'bayt', verb: 'olmal\u0131' },
            array: { unit: '\xF6\u011Fe', verb: 'olmal\u0131' },
            set: { unit: '\xF6\u011Fe', verb: 'olmal\u0131' },
        };
        function v(N) {
            return $[N] ?? null;
        }
        let U = {
            regex: 'girdi',
            email: 'e-posta adresi',
            url: 'URL',
            emoji: 'emoji',
            uuid: 'UUID',
            uuidv4: 'UUIDv4',
            uuidv6: 'UUIDv6',
            nanoid: 'nanoid',
            guid: 'GUID',
            cuid: 'cuid',
            cuid2: 'cuid2',
            ulid: 'ULID',
            xid: 'XID',
            ksuid: 'KSUID',
            datetime: 'ISO tarih ve saat',
            date: 'ISO tarih',
            time: 'ISO saat',
            duration: 'ISO s\xFCre',
            ipv4: 'IPv4 adresi',
            ipv6: 'IPv6 adresi',
            cidrv4: 'IPv4 aral\u0131\u011F\u0131',
            cidrv6: 'IPv6 aral\u0131\u011F\u0131',
            base64: 'base64 ile \u015Fifrelenmi\u015F metin',
            base64url: 'base64url ile \u015Fifrelenmi\u015F metin',
            json_string: 'JSON dizesi',
            e164: 'E.164 say\u0131s\u0131',
            jwt: 'JWT',
            template_literal: '\u015Eablon dizesi',
        };
        return (N) => {
            switch (N.code) {
                case 'invalid_type':
                    return `Ge\xE7ersiz de\u011Fer: beklenen ${N.expected}, al\u0131nan ${CD(N.input)}`;
                case 'invalid_value':
                    if (N.values.length === 1)
                        return `Ge\xE7ersiz de\u011Fer: beklenen ${M(N.values[0])}`;
                    return `Ge\xE7ersiz se\xE7enek: a\u015Fa\u011F\u0131dakilerden biri olmal\u0131: ${X(N.values, '|')}`;
                case 'too_big': {
                    let I = N.inclusive ? '<=' : '<',
                        P = v(N.origin);
                    if (P)
                        return `\xC7ok b\xFCy\xFCk: beklenen ${N.origin ?? 'de\u011Fer'} ${I}${N.maximum.toString()} ${P.unit ?? '\xF6\u011Fe'}`;
                    return `\xC7ok b\xFCy\xFCk: beklenen ${N.origin ?? 'de\u011Fer'} ${I}${N.maximum.toString()}`;
                }
                case 'too_small': {
                    let I = N.inclusive ? '>=' : '>',
                        P = v(N.origin);
                    if (P)
                        return `\xC7ok k\xFC\xE7\xFCk: beklenen ${N.origin} ${I}${N.minimum.toString()} ${P.unit}`;
                    return `\xC7ok k\xFC\xE7\xFCk: beklenen ${N.origin} ${I}${N.minimum.toString()}`;
                }
                case 'invalid_format': {
                    let I = N;
                    if (I.format === 'starts_with')
                        return `Ge\xE7ersiz metin: "${I.prefix}" ile ba\u015Flamal\u0131`;
                    if (I.format === 'ends_with')
                        return `Ge\xE7ersiz metin: "${I.suffix}" ile bitmeli`;
                    if (I.format === 'includes')
                        return `Ge\xE7ersiz metin: "${I.includes}" i\xE7ermeli`;
                    if (I.format === 'regex')
                        return `Ge\xE7ersiz metin: ${I.pattern} desenine uymal\u0131`;
                    return `Ge\xE7ersiz ${U[I.format] ?? N.format}`;
                }
                case 'not_multiple_of':
                    return `Ge\xE7ersiz say\u0131: ${N.divisor} ile tam b\xF6l\xFCnebilmeli`;
                case 'unrecognized_keys':
                    return `Tan\u0131nmayan anahtar${N.keys.length > 1 ? 'lar' : ''}: ${X(N.keys, ', ')}`;
                case 'invalid_key':
                    return `${N.origin} i\xE7inde ge\xE7ersiz anahtar`;
                case 'invalid_union':
                    return 'Ge\xE7ersiz de\u011Fer';
                case 'invalid_element':
                    return `${N.origin} i\xE7inde ge\xE7ersiz de\u011Fer`;
                default:
                    return 'Ge\xE7ersiz de\u011Fer';
            }
        };
    };
function eU() {
    return { localeError: rD() };
}
var TD = () => {
    let $ = {
        string: {
            unit: '\u0441\u0438\u043C\u0432\u043E\u043B\u0456\u0432',
            verb: '\u043C\u0430\u0442\u0438\u043C\u0435',
        },
        file: {
            unit: '\u0431\u0430\u0439\u0442\u0456\u0432',
            verb: '\u043C\u0430\u0442\u0438\u043C\u0435',
        },
        array: {
            unit: '\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0456\u0432',
            verb: '\u043C\u0430\u0442\u0438\u043C\u0435',
        },
        set: {
            unit: '\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0456\u0432',
            verb: '\u043C\u0430\u0442\u0438\u043C\u0435',
        },
    };
    function v(I) {
        return $[I] ?? null;
    }
    let U = (I) => {
            let P = typeof I;
            switch (P) {
                case 'number':
                    return Number.isNaN(I)
                        ? 'NaN'
                        : '\u0447\u0438\u0441\u043B\u043E';
                case 'object': {
                    if (Array.isArray(I))
                        return '\u043C\u0430\u0441\u0438\u0432';
                    if (I === null) return 'null';
                    if (
                        Object.getPrototypeOf(I) !== Object.prototype &&
                        I.constructor
                    )
                        return I.constructor.name;
                }
            }
            return P;
        },
        N = {
            regex: '\u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456',
            email: '\u0430\u0434\u0440\u0435\u0441\u0430 \u0435\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0457 \u043F\u043E\u0448\u0442\u0438',
            url: 'URL',
            emoji: '\u0435\u043C\u043E\u0434\u0437\u0456',
            uuid: 'UUID',
            uuidv4: 'UUIDv4',
            uuidv6: 'UUIDv6',
            nanoid: 'nanoid',
            guid: 'GUID',
            cuid: 'cuid',
            cuid2: 'cuid2',
            ulid: 'ULID',
            xid: 'XID',
            ksuid: 'KSUID',
            datetime:
                '\u0434\u0430\u0442\u0430 \u0442\u0430 \u0447\u0430\u0441 ISO',
            date: '\u0434\u0430\u0442\u0430 ISO',
            time: '\u0447\u0430\u0441 ISO',
            duration:
                '\u0442\u0440\u0438\u0432\u0430\u043B\u0456\u0441\u0442\u044C ISO',
            ipv4: '\u0430\u0434\u0440\u0435\u0441\u0430 IPv4',
            ipv6: '\u0430\u0434\u0440\u0435\u0441\u0430 IPv6',
            cidrv4: '\u0434\u0456\u0430\u043F\u0430\u0437\u043E\u043D IPv4',
            cidrv6: '\u0434\u0456\u0430\u043F\u0430\u0437\u043E\u043D IPv6',
            base64: '\u0440\u044F\u0434\u043E\u043A \u0443 \u043A\u043E\u0434\u0443\u0432\u0430\u043D\u043D\u0456 base64',
            base64url:
                '\u0440\u044F\u0434\u043E\u043A \u0443 \u043A\u043E\u0434\u0443\u0432\u0430\u043D\u043D\u0456 base64url',
            json_string: '\u0440\u044F\u0434\u043E\u043A JSON',
            e164: '\u043D\u043E\u043C\u0435\u0440 E.164',
            jwt: 'JWT',
            template_literal:
                '\u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456',
        };
    return (I) => {
        switch (I.code) {
            case 'invalid_type':
                return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F ${I.expected}, \u043E\u0442\u0440\u0438\u043C\u0430\u043D\u043E ${U(I.input)}`;
            case 'invalid_value':
                if (I.values.length === 1)
                    return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F ${M(I.values[0])}`;
                return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0430 \u043E\u043F\u0446\u0456\u044F: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F \u043E\u0434\u043D\u0435 \u0437 ${X(I.values, '|')}`;
            case 'too_big': {
                let P = I.inclusive ? '<=' : '<',
                    S = v(I.origin);
                if (S)
                    return `\u0417\u0430\u043D\u0430\u0434\u0442\u043E \u0432\u0435\u043B\u0438\u043A\u0435: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F, \u0449\u043E ${I.origin ?? '\u0437\u043D\u0430\u0447\u0435\u043D\u043D\u044F'} ${S.verb} ${P}${I.maximum.toString()} ${S.unit ?? '\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0456\u0432'}`;
                return `\u0417\u0430\u043D\u0430\u0434\u0442\u043E \u0432\u0435\u043B\u0438\u043A\u0435: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F, \u0449\u043E ${I.origin ?? '\u0437\u043D\u0430\u0447\u0435\u043D\u043D\u044F'} \u0431\u0443\u0434\u0435 ${P}${I.maximum.toString()}`;
            }
            case 'too_small': {
                let P = I.inclusive ? '>=' : '>',
                    S = v(I.origin);
                if (S)
                    return `\u0417\u0430\u043D\u0430\u0434\u0442\u043E \u043C\u0430\u043B\u0435: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F, \u0449\u043E ${I.origin} ${S.verb} ${P}${I.minimum.toString()} ${S.unit}`;
                return `\u0417\u0430\u043D\u0430\u0434\u0442\u043E \u043C\u0430\u043B\u0435: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F, \u0449\u043E ${I.origin} \u0431\u0443\u0434\u0435 ${P}${I.minimum.toString()}`;
            }
            case 'invalid_format': {
                let P = I;
                if (P.format === 'starts_with')
                    return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u0440\u044F\u0434\u043E\u043A: \u043F\u043E\u0432\u0438\u043D\u0435\u043D \u043F\u043E\u0447\u0438\u043D\u0430\u0442\u0438\u0441\u044F \u0437 "${P.prefix}"`;
                if (P.format === 'ends_with')
                    return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u0440\u044F\u0434\u043E\u043A: \u043F\u043E\u0432\u0438\u043D\u0435\u043D \u0437\u0430\u043A\u0456\u043D\u0447\u0443\u0432\u0430\u0442\u0438\u0441\u044F \u043D\u0430 "${P.suffix}"`;
                if (P.format === 'includes')
                    return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u0440\u044F\u0434\u043E\u043A: \u043F\u043E\u0432\u0438\u043D\u0435\u043D \u043C\u0456\u0441\u0442\u0438\u0442\u0438 "${P.includes}"`;
                if (P.format === 'regex')
                    return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u0440\u044F\u0434\u043E\u043A: \u043F\u043E\u0432\u0438\u043D\u0435\u043D \u0432\u0456\u0434\u043F\u043E\u0432\u0456\u0434\u0430\u0442\u0438 \u0448\u0430\u0431\u043B\u043E\u043D\u0443 ${P.pattern}`;
                return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 ${N[P.format] ?? I.format}`;
            }
            case 'not_multiple_of':
                return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0435 \u0447\u0438\u0441\u043B\u043E: \u043F\u043E\u0432\u0438\u043D\u043D\u043E \u0431\u0443\u0442\u0438 \u043A\u0440\u0430\u0442\u043D\u0438\u043C ${I.divisor}`;
            case 'unrecognized_keys':
                return `\u041D\u0435\u0440\u043E\u0437\u043F\u0456\u0437\u043D\u0430\u043D\u0438\u0439 \u043A\u043B\u044E\u0447${I.keys.length > 1 ? '\u0456' : ''}: ${X(I.keys, ', ')}`;
            case 'invalid_key':
                return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u043A\u043B\u044E\u0447 \u0443 ${I.origin}`;
            case 'invalid_union':
                return '\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456';
            case 'invalid_element':
                return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u043D\u044F \u0443 ${I.origin}`;
            default:
                return '\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456';
        }
    };
};
function aU() {
    return { localeError: TD() };
}
var xD = () => {
    let $ = {
        string: {
            unit: '\u062D\u0631\u0648\u0641',
            verb: '\u06C1\u0648\u0646\u0627',
        },
        file: {
            unit: '\u0628\u0627\u0626\u0679\u0633',
            verb: '\u06C1\u0648\u0646\u0627',
        },
        array: {
            unit: '\u0622\u0626\u0679\u0645\u0632',
            verb: '\u06C1\u0648\u0646\u0627',
        },
        set: {
            unit: '\u0622\u0626\u0679\u0645\u0632',
            verb: '\u06C1\u0648\u0646\u0627',
        },
    };
    function v(I) {
        return $[I] ?? null;
    }
    let U = (I) => {
            let P = typeof I;
            switch (P) {
                case 'number':
                    return Number.isNaN(I) ? 'NaN' : '\u0646\u0645\u0628\u0631';
                case 'object': {
                    if (Array.isArray(I)) return '\u0622\u0631\u06D2';
                    if (I === null) return '\u0646\u0644';
                    if (
                        Object.getPrototypeOf(I) !== Object.prototype &&
                        I.constructor
                    )
                        return I.constructor.name;
                }
            }
            return P;
        },
        N = {
            regex: '\u0627\u0646 \u067E\u0679',
            email: '\u0627\u06CC \u0645\u06CC\u0644 \u0627\u06CC\u0688\u0631\u06CC\u0633',
            url: '\u06CC\u0648 \u0622\u0631 \u0627\u06CC\u0644',
            emoji: '\u0627\u06CC\u0645\u0648\u062C\u06CC',
            uuid: '\u06CC\u0648 \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC',
            uuidv4: '\u06CC\u0648 \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC \u0648\u06CC 4',
            uuidv6: '\u06CC\u0648 \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC \u0648\u06CC 6',
            nanoid: '\u0646\u06CC\u0646\u0648 \u0622\u0626\u06CC \u0688\u06CC',
            guid: '\u062C\u06CC \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC',
            cuid: '\u0633\u06CC \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC',
            cuid2: '\u0633\u06CC \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC 2',
            ulid: '\u06CC\u0648 \u0627\u06CC\u0644 \u0622\u0626\u06CC \u0688\u06CC',
            xid: '\u0627\u06CC\u06A9\u0633 \u0622\u0626\u06CC \u0688\u06CC',
            ksuid: '\u06A9\u06D2 \u0627\u06CC\u0633 \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC',
            datetime:
                '\u0622\u0626\u06CC \u0627\u06CC\u0633 \u0627\u0648 \u0688\u06CC\u0679 \u0679\u0627\u0626\u0645',
            date: '\u0622\u0626\u06CC \u0627\u06CC\u0633 \u0627\u0648 \u062A\u0627\u0631\u06CC\u062E',
            time: '\u0622\u0626\u06CC \u0627\u06CC\u0633 \u0627\u0648 \u0648\u0642\u062A',
            duration:
                '\u0622\u0626\u06CC \u0627\u06CC\u0633 \u0627\u0648 \u0645\u062F\u062A',
            ipv4: '\u0622\u0626\u06CC \u067E\u06CC \u0648\u06CC 4 \u0627\u06CC\u0688\u0631\u06CC\u0633',
            ipv6: '\u0622\u0626\u06CC \u067E\u06CC \u0648\u06CC 6 \u0627\u06CC\u0688\u0631\u06CC\u0633',
            cidrv4: '\u0622\u0626\u06CC \u067E\u06CC \u0648\u06CC 4 \u0631\u06CC\u0646\u062C',
            cidrv6: '\u0622\u0626\u06CC \u067E\u06CC \u0648\u06CC 6 \u0631\u06CC\u0646\u062C',
            base64: '\u0628\u06CC\u0633 64 \u0627\u0646 \u06A9\u0648\u0688\u0688 \u0633\u0679\u0631\u0646\u06AF',
            base64url:
                '\u0628\u06CC\u0633 64 \u06CC\u0648 \u0622\u0631 \u0627\u06CC\u0644 \u0627\u0646 \u06A9\u0648\u0688\u0688 \u0633\u0679\u0631\u0646\u06AF',
            json_string:
                '\u062C\u06D2 \u0627\u06CC\u0633 \u0627\u0648 \u0627\u06CC\u0646 \u0633\u0679\u0631\u0646\u06AF',
            e164: '\u0627\u06CC 164 \u0646\u0645\u0628\u0631',
            jwt: '\u062C\u06D2 \u0688\u0628\u0644\u06CC\u0648 \u0679\u06CC',
            template_literal: '\u0627\u0646 \u067E\u0679',
        };
    return (I) => {
        switch (I.code) {
            case 'invalid_type':
                return `\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679: ${I.expected} \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627\u060C ${U(I.input)} \u0645\u0648\u0635\u0648\u0644 \u06C1\u0648\u0627`;
            case 'invalid_value':
                if (I.values.length === 1)
                    return `\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679: ${M(I.values[0])} \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627`;
                return `\u063A\u0644\u0637 \u0622\u067E\u0634\u0646: ${X(I.values, '|')} \u0645\u06CC\u06BA \u0633\u06D2 \u0627\u06CC\u06A9 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627`;
            case 'too_big': {
                let P = I.inclusive ? '<=' : '<',
                    S = v(I.origin);
                if (S)
                    return `\u0628\u06C1\u062A \u0628\u0691\u0627: ${I.origin ?? '\u0648\u06CC\u0644\u06CC\u0648'} \u06A9\u06D2 ${P}${I.maximum.toString()} ${S.unit ?? '\u0639\u0646\u0627\u0635\u0631'} \u06C1\u0648\u0646\u06D2 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u06D2`;
                return `\u0628\u06C1\u062A \u0628\u0691\u0627: ${I.origin ?? '\u0648\u06CC\u0644\u06CC\u0648'} \u06A9\u0627 ${P}${I.maximum.toString()} \u06C1\u0648\u0646\u0627 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627`;
            }
            case 'too_small': {
                let P = I.inclusive ? '>=' : '>',
                    S = v(I.origin);
                if (S)
                    return `\u0628\u06C1\u062A \u0686\u06BE\u0648\u0679\u0627: ${I.origin} \u06A9\u06D2 ${P}${I.minimum.toString()} ${S.unit} \u06C1\u0648\u0646\u06D2 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u06D2`;
                return `\u0628\u06C1\u062A \u0686\u06BE\u0648\u0679\u0627: ${I.origin} \u06A9\u0627 ${P}${I.minimum.toString()} \u06C1\u0648\u0646\u0627 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627`;
            }
            case 'invalid_format': {
                let P = I;
                if (P.format === 'starts_with')
                    return `\u063A\u0644\u0637 \u0633\u0679\u0631\u0646\u06AF: "${P.prefix}" \u0633\u06D2 \u0634\u0631\u0648\u0639 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`;
                if (P.format === 'ends_with')
                    return `\u063A\u0644\u0637 \u0633\u0679\u0631\u0646\u06AF: "${P.suffix}" \u067E\u0631 \u062E\u062A\u0645 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`;
                if (P.format === 'includes')
                    return `\u063A\u0644\u0637 \u0633\u0679\u0631\u0646\u06AF: "${P.includes}" \u0634\u0627\u0645\u0644 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`;
                if (P.format === 'regex')
                    return `\u063A\u0644\u0637 \u0633\u0679\u0631\u0646\u06AF: \u067E\u06CC\u0679\u0631\u0646 ${P.pattern} \u0633\u06D2 \u0645\u06CC\u0686 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`;
                return `\u063A\u0644\u0637 ${N[P.format] ?? I.format}`;
            }
            case 'not_multiple_of':
                return `\u063A\u0644\u0637 \u0646\u0645\u0628\u0631: ${I.divisor} \u06A9\u0627 \u0645\u0636\u0627\u0639\u0641 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`;
            case 'unrecognized_keys':
                return `\u063A\u06CC\u0631 \u062A\u0633\u0644\u06CC\u0645 \u0634\u062F\u06C1 \u06A9\u06CC${I.keys.length > 1 ? '\u0632' : ''}: ${X(I.keys, '\u060C ')}`;
            case 'invalid_key':
                return `${I.origin} \u0645\u06CC\u06BA \u063A\u0644\u0637 \u06A9\u06CC`;
            case 'invalid_union':
                return '\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679';
            case 'invalid_element':
                return `${I.origin} \u0645\u06CC\u06BA \u063A\u0644\u0637 \u0648\u06CC\u0644\u06CC\u0648`;
            default:
                return '\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679';
        }
    };
};
function sU() {
    return { localeError: xD() };
}
var fD = () => {
    let $ = {
        string: { unit: 'k\xFD t\u1EF1', verb: 'c\xF3' },
        file: { unit: 'byte', verb: 'c\xF3' },
        array: { unit: 'ph\u1EA7n t\u1EED', verb: 'c\xF3' },
        set: { unit: 'ph\u1EA7n t\u1EED', verb: 'c\xF3' },
    };
    function v(I) {
        return $[I] ?? null;
    }
    let U = (I) => {
            let P = typeof I;
            switch (P) {
                case 'number':
                    return Number.isNaN(I) ? 'NaN' : 's\u1ED1';
                case 'object': {
                    if (Array.isArray(I)) return 'm\u1EA3ng';
                    if (I === null) return 'null';
                    if (
                        Object.getPrototypeOf(I) !== Object.prototype &&
                        I.constructor
                    )
                        return I.constructor.name;
                }
            }
            return P;
        },
        N = {
            regex: '\u0111\u1EA7u v\xE0o',
            email: '\u0111\u1ECBa ch\u1EC9 email',
            url: 'URL',
            emoji: 'emoji',
            uuid: 'UUID',
            uuidv4: 'UUIDv4',
            uuidv6: 'UUIDv6',
            nanoid: 'nanoid',
            guid: 'GUID',
            cuid: 'cuid',
            cuid2: 'cuid2',
            ulid: 'ULID',
            xid: 'XID',
            ksuid: 'KSUID',
            datetime: 'ng\xE0y gi\u1EDD ISO',
            date: 'ng\xE0y ISO',
            time: 'gi\u1EDD ISO',
            duration: 'kho\u1EA3ng th\u1EDDi gian ISO',
            ipv4: '\u0111\u1ECBa ch\u1EC9 IPv4',
            ipv6: '\u0111\u1ECBa ch\u1EC9 IPv6',
            cidrv4: 'd\u1EA3i IPv4',
            cidrv6: 'd\u1EA3i IPv6',
            base64: 'chu\u1ED7i m\xE3 h\xF3a base64',
            base64url: 'chu\u1ED7i m\xE3 h\xF3a base64url',
            json_string: 'chu\u1ED7i JSON',
            e164: 's\u1ED1 E.164',
            jwt: 'JWT',
            template_literal: '\u0111\u1EA7u v\xE0o',
        };
    return (I) => {
        switch (I.code) {
            case 'invalid_type':
                return `\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7: mong \u0111\u1EE3i ${I.expected}, nh\u1EADn \u0111\u01B0\u1EE3c ${U(I.input)}`;
            case 'invalid_value':
                if (I.values.length === 1)
                    return `\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7: mong \u0111\u1EE3i ${M(I.values[0])}`;
                return `T\xF9y ch\u1ECDn kh\xF4ng h\u1EE3p l\u1EC7: mong \u0111\u1EE3i m\u1ED9t trong c\xE1c gi\xE1 tr\u1ECB ${X(I.values, '|')}`;
            case 'too_big': {
                let P = I.inclusive ? '<=' : '<',
                    S = v(I.origin);
                if (S)
                    return `Qu\xE1 l\u1EDBn: mong \u0111\u1EE3i ${I.origin ?? 'gi\xE1 tr\u1ECB'} ${S.verb} ${P}${I.maximum.toString()} ${S.unit ?? 'ph\u1EA7n t\u1EED'}`;
                return `Qu\xE1 l\u1EDBn: mong \u0111\u1EE3i ${I.origin ?? 'gi\xE1 tr\u1ECB'} ${P}${I.maximum.toString()}`;
            }
            case 'too_small': {
                let P = I.inclusive ? '>=' : '>',
                    S = v(I.origin);
                if (S)
                    return `Qu\xE1 nh\u1ECF: mong \u0111\u1EE3i ${I.origin} ${S.verb} ${P}${I.minimum.toString()} ${S.unit}`;
                return `Qu\xE1 nh\u1ECF: mong \u0111\u1EE3i ${I.origin} ${P}${I.minimum.toString()}`;
            }
            case 'invalid_format': {
                let P = I;
                if (P.format === 'starts_with')
                    return `Chu\u1ED7i kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i b\u1EAFt \u0111\u1EA7u b\u1EB1ng "${P.prefix}"`;
                if (P.format === 'ends_with')
                    return `Chu\u1ED7i kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i k\u1EBFt th\xFAc b\u1EB1ng "${P.suffix}"`;
                if (P.format === 'includes')
                    return `Chu\u1ED7i kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i bao g\u1ED3m "${P.includes}"`;
                if (P.format === 'regex')
                    return `Chu\u1ED7i kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i kh\u1EDBp v\u1EDBi m\u1EABu ${P.pattern}`;
                return `${N[P.format] ?? I.format} kh\xF4ng h\u1EE3p l\u1EC7`;
            }
            case 'not_multiple_of':
                return `S\u1ED1 kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i l\xE0 b\u1ED9i s\u1ED1 c\u1EE7a ${I.divisor}`;
            case 'unrecognized_keys':
                return `Kh\xF3a kh\xF4ng \u0111\u01B0\u1EE3c nh\u1EADn d\u1EA1ng: ${X(I.keys, ', ')}`;
            case 'invalid_key':
                return `Kh\xF3a kh\xF4ng h\u1EE3p l\u1EC7 trong ${I.origin}`;
            case 'invalid_union':
                return '\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7';
            case 'invalid_element':
                return `Gi\xE1 tr\u1ECB kh\xF4ng h\u1EE3p l\u1EC7 trong ${I.origin}`;
            default:
                return '\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7';
        }
    };
};
function $N() {
    return { localeError: fD() };
}
var mD = () => {
    let $ = {
        string: { unit: '\u5B57\u7B26', verb: '\u5305\u542B' },
        file: { unit: '\u5B57\u8282', verb: '\u5305\u542B' },
        array: { unit: '\u9879', verb: '\u5305\u542B' },
        set: { unit: '\u9879', verb: '\u5305\u542B' },
    };
    function v(I) {
        return $[I] ?? null;
    }
    let U = (I) => {
            let P = typeof I;
            switch (P) {
                case 'number':
                    return Number.isNaN(I)
                        ? '\u975E\u6570\u5B57(NaN)'
                        : '\u6570\u5B57';
                case 'object': {
                    if (Array.isArray(I)) return '\u6570\u7EC4';
                    if (I === null) return '\u7A7A\u503C(null)';
                    if (
                        Object.getPrototypeOf(I) !== Object.prototype &&
                        I.constructor
                    )
                        return I.constructor.name;
                }
            }
            return P;
        },
        N = {
            regex: '\u8F93\u5165',
            email: '\u7535\u5B50\u90AE\u4EF6',
            url: 'URL',
            emoji: '\u8868\u60C5\u7B26\u53F7',
            uuid: 'UUID',
            uuidv4: 'UUIDv4',
            uuidv6: 'UUIDv6',
            nanoid: 'nanoid',
            guid: 'GUID',
            cuid: 'cuid',
            cuid2: 'cuid2',
            ulid: 'ULID',
            xid: 'XID',
            ksuid: 'KSUID',
            datetime: 'ISO\u65E5\u671F\u65F6\u95F4',
            date: 'ISO\u65E5\u671F',
            time: 'ISO\u65F6\u95F4',
            duration: 'ISO\u65F6\u957F',
            ipv4: 'IPv4\u5730\u5740',
            ipv6: 'IPv6\u5730\u5740',
            cidrv4: 'IPv4\u7F51\u6BB5',
            cidrv6: 'IPv6\u7F51\u6BB5',
            base64: 'base64\u7F16\u7801\u5B57\u7B26\u4E32',
            base64url: 'base64url\u7F16\u7801\u5B57\u7B26\u4E32',
            json_string: 'JSON\u5B57\u7B26\u4E32',
            e164: 'E.164\u53F7\u7801',
            jwt: 'JWT',
            template_literal: '\u8F93\u5165',
        };
    return (I) => {
        switch (I.code) {
            case 'invalid_type':
                return `\u65E0\u6548\u8F93\u5165\uFF1A\u671F\u671B ${I.expected}\uFF0C\u5B9E\u9645\u63A5\u6536 ${U(I.input)}`;
            case 'invalid_value':
                if (I.values.length === 1)
                    return `\u65E0\u6548\u8F93\u5165\uFF1A\u671F\u671B ${M(I.values[0])}`;
                return `\u65E0\u6548\u9009\u9879\uFF1A\u671F\u671B\u4EE5\u4E0B\u4E4B\u4E00 ${X(I.values, '|')}`;
            case 'too_big': {
                let P = I.inclusive ? '<=' : '<',
                    S = v(I.origin);
                if (S)
                    return `\u6570\u503C\u8FC7\u5927\uFF1A\u671F\u671B ${I.origin ?? '\u503C'} ${P}${I.maximum.toString()} ${S.unit ?? '\u4E2A\u5143\u7D20'}`;
                return `\u6570\u503C\u8FC7\u5927\uFF1A\u671F\u671B ${I.origin ?? '\u503C'} ${P}${I.maximum.toString()}`;
            }
            case 'too_small': {
                let P = I.inclusive ? '>=' : '>',
                    S = v(I.origin);
                if (S)
                    return `\u6570\u503C\u8FC7\u5C0F\uFF1A\u671F\u671B ${I.origin} ${P}${I.minimum.toString()} ${S.unit}`;
                return `\u6570\u503C\u8FC7\u5C0F\uFF1A\u671F\u671B ${I.origin} ${P}${I.minimum.toString()}`;
            }
            case 'invalid_format': {
                let P = I;
                if (P.format === 'starts_with')
                    return `\u65E0\u6548\u5B57\u7B26\u4E32\uFF1A\u5FC5\u987B\u4EE5 "${P.prefix}" \u5F00\u5934`;
                if (P.format === 'ends_with')
                    return `\u65E0\u6548\u5B57\u7B26\u4E32\uFF1A\u5FC5\u987B\u4EE5 "${P.suffix}" \u7ED3\u5C3E`;
                if (P.format === 'includes')
                    return `\u65E0\u6548\u5B57\u7B26\u4E32\uFF1A\u5FC5\u987B\u5305\u542B "${P.includes}"`;
                if (P.format === 'regex')
                    return `\u65E0\u6548\u5B57\u7B26\u4E32\uFF1A\u5FC5\u987B\u6EE1\u8DB3\u6B63\u5219\u8868\u8FBE\u5F0F ${P.pattern}`;
                return `\u65E0\u6548${N[P.format] ?? I.format}`;
            }
            case 'not_multiple_of':
                return `\u65E0\u6548\u6570\u5B57\uFF1A\u5FC5\u987B\u662F ${I.divisor} \u7684\u500D\u6570`;
            case 'unrecognized_keys':
                return `\u51FA\u73B0\u672A\u77E5\u7684\u952E(key): ${X(I.keys, ', ')}`;
            case 'invalid_key':
                return `${I.origin} \u4E2D\u7684\u952E(key)\u65E0\u6548`;
            case 'invalid_union':
                return '\u65E0\u6548\u8F93\u5165';
            case 'invalid_element':
                return `${I.origin} \u4E2D\u5305\u542B\u65E0\u6548\u503C(value)`;
            default:
                return '\u65E0\u6548\u8F93\u5165';
        }
    };
};
function vN() {
    return { localeError: mD() };
}
var gD = () => {
    let $ = {
        string: { unit: '\u5B57\u5143', verb: '\u64C1\u6709' },
        file: { unit: '\u4F4D\u5143\u7D44', verb: '\u64C1\u6709' },
        array: { unit: '\u9805\u76EE', verb: '\u64C1\u6709' },
        set: { unit: '\u9805\u76EE', verb: '\u64C1\u6709' },
    };
    function v(I) {
        return $[I] ?? null;
    }
    let U = (I) => {
            let P = typeof I;
            switch (P) {
                case 'number':
                    return Number.isNaN(I) ? 'NaN' : 'number';
                case 'object': {
                    if (Array.isArray(I)) return 'array';
                    if (I === null) return 'null';
                    if (
                        Object.getPrototypeOf(I) !== Object.prototype &&
                        I.constructor
                    )
                        return I.constructor.name;
                }
            }
            return P;
        },
        N = {
            regex: '\u8F38\u5165',
            email: '\u90F5\u4EF6\u5730\u5740',
            url: 'URL',
            emoji: 'emoji',
            uuid: 'UUID',
            uuidv4: 'UUIDv4',
            uuidv6: 'UUIDv6',
            nanoid: 'nanoid',
            guid: 'GUID',
            cuid: 'cuid',
            cuid2: 'cuid2',
            ulid: 'ULID',
            xid: 'XID',
            ksuid: 'KSUID',
            datetime: 'ISO \u65E5\u671F\u6642\u9593',
            date: 'ISO \u65E5\u671F',
            time: 'ISO \u6642\u9593',
            duration: 'ISO \u671F\u9593',
            ipv4: 'IPv4 \u4F4D\u5740',
            ipv6: 'IPv6 \u4F4D\u5740',
            cidrv4: 'IPv4 \u7BC4\u570D',
            cidrv6: 'IPv6 \u7BC4\u570D',
            base64: 'base64 \u7DE8\u78BC\u5B57\u4E32',
            base64url: 'base64url \u7DE8\u78BC\u5B57\u4E32',
            json_string: 'JSON \u5B57\u4E32',
            e164: 'E.164 \u6578\u503C',
            jwt: 'JWT',
            template_literal: '\u8F38\u5165',
        };
    return (I) => {
        switch (I.code) {
            case 'invalid_type':
                return `\u7121\u6548\u7684\u8F38\u5165\u503C\uFF1A\u9810\u671F\u70BA ${I.expected}\uFF0C\u4F46\u6536\u5230 ${U(I.input)}`;
            case 'invalid_value':
                if (I.values.length === 1)
                    return `\u7121\u6548\u7684\u8F38\u5165\u503C\uFF1A\u9810\u671F\u70BA ${M(I.values[0])}`;
                return `\u7121\u6548\u7684\u9078\u9805\uFF1A\u9810\u671F\u70BA\u4EE5\u4E0B\u5176\u4E2D\u4E4B\u4E00 ${X(I.values, '|')}`;
            case 'too_big': {
                let P = I.inclusive ? '<=' : '<',
                    S = v(I.origin);
                if (S)
                    return `\u6578\u503C\u904E\u5927\uFF1A\u9810\u671F ${I.origin ?? '\u503C'} \u61C9\u70BA ${P}${I.maximum.toString()} ${S.unit ?? '\u500B\u5143\u7D20'}`;
                return `\u6578\u503C\u904E\u5927\uFF1A\u9810\u671F ${I.origin ?? '\u503C'} \u61C9\u70BA ${P}${I.maximum.toString()}`;
            }
            case 'too_small': {
                let P = I.inclusive ? '>=' : '>',
                    S = v(I.origin);
                if (S)
                    return `\u6578\u503C\u904E\u5C0F\uFF1A\u9810\u671F ${I.origin} \u61C9\u70BA ${P}${I.minimum.toString()} ${S.unit}`;
                return `\u6578\u503C\u904E\u5C0F\uFF1A\u9810\u671F ${I.origin} \u61C9\u70BA ${P}${I.minimum.toString()}`;
            }
            case 'invalid_format': {
                let P = I;
                if (P.format === 'starts_with')
                    return `\u7121\u6548\u7684\u5B57\u4E32\uFF1A\u5FC5\u9808\u4EE5 "${P.prefix}" \u958B\u982D`;
                if (P.format === 'ends_with')
                    return `\u7121\u6548\u7684\u5B57\u4E32\uFF1A\u5FC5\u9808\u4EE5 "${P.suffix}" \u7D50\u5C3E`;
                if (P.format === 'includes')
                    return `\u7121\u6548\u7684\u5B57\u4E32\uFF1A\u5FC5\u9808\u5305\u542B "${P.includes}"`;
                if (P.format === 'regex')
                    return `\u7121\u6548\u7684\u5B57\u4E32\uFF1A\u5FC5\u9808\u7B26\u5408\u683C\u5F0F ${P.pattern}`;
                return `\u7121\u6548\u7684 ${N[P.format] ?? I.format}`;
            }
            case 'not_multiple_of':
                return `\u7121\u6548\u7684\u6578\u5B57\uFF1A\u5FC5\u9808\u70BA ${I.divisor} \u7684\u500D\u6578`;
            case 'unrecognized_keys':
                return `\u7121\u6CD5\u8B58\u5225\u7684\u9375\u503C${I.keys.length > 1 ? '\u5011' : ''}\uFF1A${X(I.keys, '\u3001')}`;
            case 'invalid_key':
                return `${I.origin} \u4E2D\u6709\u7121\u6548\u7684\u9375\u503C`;
            case 'invalid_union':
                return '\u7121\u6548\u7684\u8F38\u5165\u503C';
            case 'invalid_element':
                return `${I.origin} \u4E2D\u6709\u7121\u6548\u7684\u503C`;
            default:
                return '\u7121\u6548\u7684\u8F38\u5165\u503C';
        }
    };
};
function IN() {
    return { localeError: gD() };
}
var UN = Symbol('ZodOutput'),
    NN = Symbol('ZodInput');
class Bv {
    constructor() {
        (this._map = new Map()), (this._idmap = new Map());
    }
    add($, ...v) {
        let U = v[0];
        if ((this._map.set($, U), U && typeof U === 'object' && 'id' in U)) {
            if (this._idmap.has(U.id))
                throw new Error(`ID ${U.id} already exists in the registry`);
            this._idmap.set(U.id, $);
        }
        return this;
    }
    clear() {
        return (this._map = new Map()), (this._idmap = new Map()), this;
    }
    remove($) {
        let v = this._map.get($);
        if (v && typeof v === 'object' && 'id' in v) this._idmap.delete(v.id);
        return this._map.delete($), this;
    }
    get($) {
        let v = $._zod.parent;
        if (v) {
            let U = { ...(this.get(v) ?? {}) };
            return delete U.id, { ...U, ...this._map.get($) };
        }
        return this._map.get($);
    }
    has($) {
        return this._map.has($);
    }
}
function N6() {
    return new Bv();
}
var $$ = N6();
function PN($, v) {
    return new $({ type: 'string', ...Q(v) });
}
function SN($, v) {
    return new $({ type: 'string', coerce: !0, ...Q(v) });
}
function P6($, v) {
    return new $({
        type: 'string',
        format: 'email',
        check: 'string_format',
        abort: !1,
        ...Q(v),
    });
}
function Yv($, v) {
    return new $({
        type: 'string',
        format: 'guid',
        check: 'string_format',
        abort: !1,
        ...Q(v),
    });
}
function S6($, v) {
    return new $({
        type: 'string',
        format: 'uuid',
        check: 'string_format',
        abort: !1,
        ...Q(v),
    });
}
function O6($, v) {
    return new $({
        type: 'string',
        format: 'uuid',
        check: 'string_format',
        abort: !1,
        version: 'v4',
        ...Q(v),
    });
}
function z6($, v) {
    return new $({
        type: 'string',
        format: 'uuid',
        check: 'string_format',
        abort: !1,
        version: 'v6',
        ...Q(v),
    });
}
function D6($, v) {
    return new $({
        type: 'string',
        format: 'uuid',
        check: 'string_format',
        abort: !1,
        version: 'v7',
        ...Q(v),
    });
}
function J6($, v) {
    return new $({
        type: 'string',
        format: 'url',
        check: 'string_format',
        abort: !1,
        ...Q(v),
    });
}
function A6($, v) {
    return new $({
        type: 'string',
        format: 'emoji',
        check: 'string_format',
        abort: !1,
        ...Q(v),
    });
}
function L6($, v) {
    return new $({
        type: 'string',
        format: 'nanoid',
        check: 'string_format',
        abort: !1,
        ...Q(v),
    });
}
function V6($, v) {
    return new $({
        type: 'string',
        format: 'cuid',
        check: 'string_format',
        abort: !1,
        ...Q(v),
    });
}
function G6($, v) {
    return new $({
        type: 'string',
        format: 'cuid2',
        check: 'string_format',
        abort: !1,
        ...Q(v),
    });
}
function X6($, v) {
    return new $({
        type: 'string',
        format: 'ulid',
        check: 'string_format',
        abort: !1,
        ...Q(v),
    });
}
function W6($, v) {
    return new $({
        type: 'string',
        format: 'xid',
        check: 'string_format',
        abort: !1,
        ...Q(v),
    });
}
function B6($, v) {
    return new $({
        type: 'string',
        format: 'ksuid',
        check: 'string_format',
        abort: !1,
        ...Q(v),
    });
}
function Y6($, v) {
    return new $({
        type: 'string',
        format: 'ipv4',
        check: 'string_format',
        abort: !1,
        ...Q(v),
    });
}
function Q6($, v) {
    return new $({
        type: 'string',
        format: 'ipv6',
        check: 'string_format',
        abort: !1,
        ...Q(v),
    });
}
function M6($, v) {
    return new $({
        type: 'string',
        format: 'cidrv4',
        check: 'string_format',
        abort: !1,
        ...Q(v),
    });
}
function H6($, v) {
    return new $({
        type: 'string',
        format: 'cidrv6',
        check: 'string_format',
        abort: !1,
        ...Q(v),
    });
}
function j6($, v) {
    return new $({
        type: 'string',
        format: 'base64',
        check: 'string_format',
        abort: !1,
        ...Q(v),
    });
}
function K6($, v) {
    return new $({
        type: 'string',
        format: 'base64url',
        check: 'string_format',
        abort: !1,
        ...Q(v),
    });
}
function w6($, v) {
    return new $({
        type: 'string',
        format: 'e164',
        check: 'string_format',
        abort: !1,
        ...Q(v),
    });
}
function b6($, v) {
    return new $({
        type: 'string',
        format: 'jwt',
        check: 'string_format',
        abort: !1,
        ...Q(v),
    });
}
var ON = { Any: null, Minute: -1, Second: 0, Millisecond: 3, Microsecond: 6 };
function zN($, v) {
    return new $({
        type: 'string',
        format: 'datetime',
        check: 'string_format',
        offset: !1,
        local: !1,
        precision: null,
        ...Q(v),
    });
}
function DN($, v) {
    return new $({
        type: 'string',
        format: 'date',
        check: 'string_format',
        ...Q(v),
    });
}
function JN($, v) {
    return new $({
        type: 'string',
        format: 'time',
        check: 'string_format',
        precision: null,
        ...Q(v),
    });
}
function AN($, v) {
    return new $({
        type: 'string',
        format: 'duration',
        check: 'string_format',
        ...Q(v),
    });
}
function LN($, v) {
    return new $({ type: 'number', checks: [], ...Q(v) });
}
function VN($, v) {
    return new $({ type: 'number', coerce: !0, checks: [], ...Q(v) });
}
function GN($, v) {
    return new $({
        type: 'number',
        check: 'number_format',
        abort: !1,
        format: 'safeint',
        ...Q(v),
    });
}
function XN($, v) {
    return new $({
        type: 'number',
        check: 'number_format',
        abort: !1,
        format: 'float32',
        ...Q(v),
    });
}
function WN($, v) {
    return new $({
        type: 'number',
        check: 'number_format',
        abort: !1,
        format: 'float64',
        ...Q(v),
    });
}
function BN($, v) {
    return new $({
        type: 'number',
        check: 'number_format',
        abort: !1,
        format: 'int32',
        ...Q(v),
    });
}
function YN($, v) {
    return new $({
        type: 'number',
        check: 'number_format',
        abort: !1,
        format: 'uint32',
        ...Q(v),
    });
}
function QN($, v) {
    return new $({ type: 'boolean', ...Q(v) });
}
function MN($, v) {
    return new $({ type: 'boolean', coerce: !0, ...Q(v) });
}
function HN($, v) {
    return new $({ type: 'bigint', ...Q(v) });
}
function jN($, v) {
    return new $({ type: 'bigint', coerce: !0, ...Q(v) });
}
function KN($, v) {
    return new $({
        type: 'bigint',
        check: 'bigint_format',
        abort: !1,
        format: 'int64',
        ...Q(v),
    });
}
function wN($, v) {
    return new $({
        type: 'bigint',
        check: 'bigint_format',
        abort: !1,
        format: 'uint64',
        ...Q(v),
    });
}
function bN($, v) {
    return new $({ type: 'symbol', ...Q(v) });
}
function uN($, v) {
    return new $({ type: 'undefined', ...Q(v) });
}
function cN($, v) {
    return new $({ type: 'null', ...Q(v) });
}
function FN($) {
    return new $({ type: 'any' });
}
function m$($) {
    return new $({ type: 'unknown' });
}
function EN($, v) {
    return new $({ type: 'never', ...Q(v) });
}
function qN($, v) {
    return new $({ type: 'void', ...Q(v) });
}
function kN($, v) {
    return new $({ type: 'date', ...Q(v) });
}
function ZN($, v) {
    return new $({ type: 'date', coerce: !0, ...Q(v) });
}
function RN($, v) {
    return new $({ type: 'nan', ...Q(v) });
}
function S$($, v) {
    return new dv({ check: 'less_than', ...Q(v), value: $, inclusive: !1 });
}
function d($, v) {
    return new dv({ check: 'less_than', ...Q(v), value: $, inclusive: !0 });
}
function O$($, v) {
    return new ev({ check: 'greater_than', ...Q(v), value: $, inclusive: !1 });
}
function h($, v) {
    return new ev({ check: 'greater_than', ...Q(v), value: $, inclusive: !0 });
}
function CN($) {
    return O$(0, $);
}
function rN($) {
    return S$(0, $);
}
function TN($) {
    return d(0, $);
}
function xN($) {
    return h(0, $);
}
function b$($, v) {
    return new e4({ check: 'multiple_of', ...Q(v), value: $ });
}
function g$($, v) {
    return new $I({ check: 'max_size', ...Q(v), maximum: $ });
}
function u$($, v) {
    return new vI({ check: 'min_size', ...Q(v), minimum: $ });
}
function Qv($, v) {
    return new II({ check: 'size_equals', ...Q(v), size: $ });
}
function n$($, v) {
    return new UI({ check: 'max_length', ...Q(v), maximum: $ });
}
function G$($, v) {
    return new NI({ check: 'min_length', ...Q(v), minimum: $ });
}
function y$($, v) {
    return new PI({ check: 'length_equals', ...Q(v), length: $ });
}
function Mv($, v) {
    return new SI({
        check: 'string_format',
        format: 'regex',
        ...Q(v),
        pattern: $,
    });
}
function Hv($) {
    return new OI({ check: 'string_format', format: 'lowercase', ...Q($) });
}
function jv($) {
    return new zI({ check: 'string_format', format: 'uppercase', ...Q($) });
}
function Kv($, v) {
    return new DI({
        check: 'string_format',
        format: 'includes',
        ...Q(v),
        includes: $,
    });
}
function wv($, v) {
    return new JI({
        check: 'string_format',
        format: 'starts_with',
        ...Q(v),
        prefix: $,
    });
}
function bv($, v) {
    return new AI({
        check: 'string_format',
        format: 'ends_with',
        ...Q(v),
        suffix: $,
    });
}
function fN($, v, U) {
    return new LI({ check: 'property', property: $, schema: v, ...Q(U) });
}
function uv($, v) {
    return new VI({ check: 'mime_type', mime: $, ...Q(v) });
}
function z$($) {
    return new GI({ check: 'overwrite', tx: $ });
}
function cv($) {
    return z$((v) => v.normalize($));
}
function Fv() {
    return z$(($) => $.trim());
}
function Ev() {
    return z$(($) => $.toLowerCase());
}
function qv() {
    return z$(($) => $.toUpperCase());
}
function kv($, v, U) {
    return new $({ type: 'array', element: v, ...Q(U) });
}
function nD($, v, U) {
    return new $({ type: 'union', options: v, ...Q(U) });
}
function yD($, v, U, N) {
    return new $({ type: 'union', options: U, discriminator: v, ...Q(N) });
}
function hD($, v, U) {
    return new $({ type: 'intersection', left: v, right: U });
}
function mN($, v, U, N) {
    let I = U instanceof w;
    return new $({
        type: 'tuple',
        items: v,
        rest: I ? U : null,
        ...Q(I ? N : U),
    });
}
function _D($, v, U, N) {
    return new $({ type: 'record', keyType: v, valueType: U, ...Q(N) });
}
function oD($, v, U, N) {
    return new $({ type: 'map', keyType: v, valueType: U, ...Q(N) });
}
function lD($, v, U) {
    return new $({ type: 'set', valueType: v, ...Q(U) });
}
function pD($, v, U) {
    let N = Array.isArray(v) ? Object.fromEntries(v.map((I) => [I, I])) : v;
    return new $({ type: 'enum', entries: N, ...Q(U) });
}
function iD($, v, U) {
    return new $({ type: 'enum', entries: v, ...Q(U) });
}
function tD($, v, U) {
    return new $({
        type: 'literal',
        values: Array.isArray(v) ? v : [v],
        ...Q(U),
    });
}
function gN($, v) {
    return new $({ type: 'file', ...Q(v) });
}
function dD($, v) {
    return new $({ type: 'transform', transform: v });
}
function eD($, v) {
    return new $({ type: 'optional', innerType: v });
}
function aD($, v) {
    return new $({ type: 'nullable', innerType: v });
}
function sD($, v, U) {
    return new $({
        type: 'default',
        innerType: v,
        get defaultValue() {
            return typeof U === 'function' ? U() : U;
        },
    });
}
function $J($, v, U) {
    return new $({ type: 'nonoptional', innerType: v, ...Q(U) });
}
function vJ($, v) {
    return new $({ type: 'success', innerType: v });
}
function IJ($, v, U) {
    return new $({
        type: 'catch',
        innerType: v,
        catchValue: typeof U === 'function' ? U : () => U,
    });
}
function UJ($, v, U) {
    return new $({ type: 'pipe', in: v, out: U });
}
function NJ($, v) {
    return new $({ type: 'readonly', innerType: v });
}
function PJ($, v, U) {
    return new $({ type: 'template_literal', parts: v, ...Q(U) });
}
function SJ($, v) {
    return new $({ type: 'lazy', getter: v });
}
function OJ($, v) {
    return new $({ type: 'promise', innerType: v });
}
function nN($, v, U) {
    let N = Q(U);
    return (
        N.abort ?? (N.abort = !0),
        new $({ type: 'custom', check: 'custom', fn: v, ...N })
    );
}
function yN($, v, U) {
    return new $({ type: 'custom', check: 'custom', fn: v, ...Q(U) });
}
function hN($, v) {
    let U = Q(v),
        N = U.truthy ?? ['true', '1', 'yes', 'on', 'y', 'enabled'],
        I = U.falsy ?? ['false', '0', 'no', 'off', 'n', 'disabled'];
    if (U.case !== 'sensitive')
        (N = N.map((B) => (typeof B === 'string' ? B.toLowerCase() : B))),
            (I = I.map((B) => (typeof B === 'string' ? B.toLowerCase() : B)));
    let P = new Set(N),
        S = new Set(I),
        O = $.Pipe ?? Gv,
        J = $.Boolean ?? Av,
        A = $.String ?? K$,
        G = new ($.Transform ?? Vv)({
            type: 'transform',
            transform: (B, Y) => {
                let j = B;
                if (U.case !== 'sensitive') j = j.toLowerCase();
                if (P.has(j)) return !0;
                else if (S.has(j)) return !1;
                else
                    return (
                        Y.issues.push({
                            code: 'invalid_value',
                            expected: 'stringbool',
                            values: [...P, ...S],
                            input: Y.value,
                            inst: G,
                        }),
                        {}
                    );
            },
            error: U.error,
        }),
        W = new O({
            type: 'pipe',
            in: new A({ type: 'string', error: U.error }),
            out: G,
            error: U.error,
        });
    return new O({
        type: 'pipe',
        in: W,
        out: new J({ type: 'boolean', error: U.error }),
        error: U.error,
    });
}
function _N($, v, U, N = {}) {
    let I = Q(N),
        P = {
            ...Q(N),
            check: 'string_format',
            type: 'string',
            format: v,
            fn: typeof U === 'function' ? U : (O) => U.test(O),
            ...I,
        };
    if (U instanceof RegExp) P.pattern = U;
    return new $(P);
}
class oN {
    constructor($) {
        (this._def = $), (this.def = $);
    }
    implement($) {
        if (typeof $ !== 'function')
            throw new Error('implement() must be called with a function');
        let v = (...U) => {
            let N = this._def.input
                ? _v(this._def.input, U, void 0, { callee: v })
                : U;
            if (!Array.isArray(N))
                throw new Error(
                    'Invalid arguments schema: not an array or tuple schema.',
                );
            let I = $(...N);
            return this._def.output
                ? _v(this._def.output, I, void 0, { callee: v })
                : I;
        };
        return v;
    }
    implementAsync($) {
        if (typeof $ !== 'function')
            throw new Error('implement() must be called with a function');
        let v = async (...U) => {
            let N = this._def.input
                ? await lv(this._def.input, U, void 0, { callee: v })
                : U;
            if (!Array.isArray(N))
                throw new Error(
                    'Invalid arguments schema: not an array or tuple schema.',
                );
            let I = await $(...N);
            return this._def.output
                ? lv(this._def.output, I, void 0, { callee: v })
                : I;
        };
        return v;
    }
    input(...$) {
        let v = this.constructor;
        if (Array.isArray($[0]))
            return new v({
                type: 'function',
                input: new w$({ type: 'tuple', items: $[0], rest: $[1] }),
                output: this._def.output,
            });
        return new v({
            type: 'function',
            input: $[0],
            output: this._def.output,
        });
    }
    output($) {
        return new this.constructor({
            type: 'function',
            input: this._def.input,
            output: $,
        });
    }
}
function lN($) {
    return new oN({
        type: 'function',
        input: Array.isArray($?.input)
            ? mN(w$, $?.input)
            : ($?.input ?? kv(Lv, m$(f$))),
        output: $?.output ?? m$(f$),
    });
}
class u6 {
    constructor($) {
        (this.counter = 0),
            (this.metadataRegistry = $?.metadata ?? $$),
            (this.target = $?.target ?? 'draft-2020-12'),
            (this.unrepresentable = $?.unrepresentable ?? 'throw'),
            (this.override = $?.override ?? (() => {})),
            (this.io = $?.io ?? 'output'),
            (this.seen = new Map());
    }
    process($, v = { path: [], schemaPath: [] }) {
        var U;
        let N = $._zod.def,
            I = {
                guid: 'uuid',
                url: 'uri',
                datetime: 'date-time',
                json_string: 'json-string',
                regex: '',
            },
            P = this.seen.get($);
        if (P) {
            if ((P.count++, v.schemaPath.includes($))) P.cycle = v.path;
            return P.schema;
        }
        let S = { schema: {}, count: 1, cycle: void 0, path: v.path };
        this.seen.set($, S);
        let O = $._zod.toJSONSchema?.();
        if (O) S.schema = O;
        else {
            let D = { ...v, schemaPath: [...v.schemaPath, $], path: v.path },
                G = $._zod.parent;
            if (G)
                (S.ref = G),
                    this.process(G, D),
                    (this.seen.get(G).isParent = !0);
            else {
                let W = S.schema;
                switch (N.type) {
                    case 'string': {
                        let z = W;
                        z.type = 'string';
                        let {
                            minimum: B,
                            maximum: Y,
                            format: j,
                            patterns: K,
                            contentEncoding: b,
                        } = $._zod.bag;
                        if (typeof B === 'number') z.minLength = B;
                        if (typeof Y === 'number') z.maxLength = Y;
                        if (j) {
                            if (((z.format = I[j] ?? j), z.format === ''))
                                delete z.format;
                        }
                        if (b) z.contentEncoding = b;
                        if (K && K.size > 0) {
                            let u = [...K];
                            if (u.length === 1) z.pattern = u[0].source;
                            else if (u.length > 1)
                                S.schema.allOf = [
                                    ...u.map((E) => ({
                                        ...(this.target === 'draft-7'
                                            ? { type: 'string' }
                                            : {}),
                                        pattern: E.source,
                                    })),
                                ];
                        }
                        break;
                    }
                    case 'number': {
                        let z = W,
                            {
                                minimum: B,
                                maximum: Y,
                                format: j,
                                multipleOf: K,
                                exclusiveMaximum: b,
                                exclusiveMinimum: u,
                            } = $._zod.bag;
                        if (typeof j === 'string' && j.includes('int'))
                            z.type = 'integer';
                        else z.type = 'number';
                        if (typeof u === 'number') z.exclusiveMinimum = u;
                        if (typeof B === 'number') {
                            if (((z.minimum = B), typeof u === 'number'))
                                if (u >= B) delete z.minimum;
                                else delete z.exclusiveMinimum;
                        }
                        if (typeof b === 'number') z.exclusiveMaximum = b;
                        if (typeof Y === 'number') {
                            if (((z.maximum = Y), typeof b === 'number'))
                                if (b <= Y) delete z.maximum;
                                else delete z.exclusiveMaximum;
                        }
                        if (typeof K === 'number') z.multipleOf = K;
                        break;
                    }
                    case 'boolean': {
                        let z = W;
                        z.type = 'boolean';
                        break;
                    }
                    case 'bigint': {
                        if (this.unrepresentable === 'throw')
                            throw new Error(
                                'BigInt cannot be represented in JSON Schema',
                            );
                        break;
                    }
                    case 'symbol': {
                        if (this.unrepresentable === 'throw')
                            throw new Error(
                                'Symbols cannot be represented in JSON Schema',
                            );
                        break;
                    }
                    case 'null': {
                        W.type = 'null';
                        break;
                    }
                    case 'any':
                        break;
                    case 'unknown':
                        break;
                    case 'undefined': {
                        if (this.unrepresentable === 'throw')
                            throw new Error(
                                'Undefined cannot be represented in JSON Schema',
                            );
                        break;
                    }
                    case 'void': {
                        if (this.unrepresentable === 'throw')
                            throw new Error(
                                'Void cannot be represented in JSON Schema',
                            );
                        break;
                    }
                    case 'never': {
                        W.not = {};
                        break;
                    }
                    case 'date': {
                        if (this.unrepresentable === 'throw')
                            throw new Error(
                                'Date cannot be represented in JSON Schema',
                            );
                        break;
                    }
                    case 'array': {
                        let z = W,
                            { minimum: B, maximum: Y } = $._zod.bag;
                        if (typeof B === 'number') z.minItems = B;
                        if (typeof Y === 'number') z.maxItems = Y;
                        (z.type = 'array'),
                            (z.items = this.process(N.element, {
                                ...D,
                                path: [...D.path, 'items'],
                            }));
                        break;
                    }
                    case 'object': {
                        let z = W;
                        (z.type = 'object'), (z.properties = {});
                        let B = N.shape;
                        for (let K in B)
                            z.properties[K] = this.process(B[K], {
                                ...D,
                                path: [...D.path, 'properties', K],
                            });
                        let Y = new Set(Object.keys(B)),
                            j = new Set(
                                [...Y].filter((K) => {
                                    let b = N.shape[K]._zod;
                                    if (this.io === 'input')
                                        return b.optin === void 0;
                                    else return b.optout === void 0;
                                }),
                            );
                        if (j.size > 0) z.required = Array.from(j);
                        if (N.catchall?._zod.def.type === 'never')
                            z.additionalProperties = !1;
                        else if (!N.catchall) {
                            if (this.io === 'output')
                                z.additionalProperties = !1;
                        } else if (N.catchall)
                            z.additionalProperties = this.process(N.catchall, {
                                ...D,
                                path: [...D.path, 'additionalProperties'],
                            });
                        break;
                    }
                    case 'union': {
                        let z = W;
                        z.anyOf = N.options.map((B, Y) =>
                            this.process(B, {
                                ...D,
                                path: [...D.path, 'anyOf', Y],
                            }),
                        );
                        break;
                    }
                    case 'intersection': {
                        let z = W,
                            B = this.process(N.left, {
                                ...D,
                                path: [...D.path, 'allOf', 0],
                            }),
                            Y = this.process(N.right, {
                                ...D,
                                path: [...D.path, 'allOf', 1],
                            }),
                            j = (b) =>
                                'allOf' in b && Object.keys(b).length === 1,
                            K = [
                                ...(j(B) ? B.allOf : [B]),
                                ...(j(Y) ? Y.allOf : [Y]),
                            ];
                        z.allOf = K;
                        break;
                    }
                    case 'tuple': {
                        let z = W;
                        z.type = 'array';
                        let B = N.items.map((K, b) =>
                            this.process(K, {
                                ...D,
                                path: [...D.path, 'prefixItems', b],
                            }),
                        );
                        if (this.target === 'draft-2020-12') z.prefixItems = B;
                        else z.items = B;
                        if (N.rest) {
                            let K = this.process(N.rest, {
                                ...D,
                                path: [...D.path, 'items'],
                            });
                            if (this.target === 'draft-2020-12') z.items = K;
                            else z.additionalItems = K;
                        }
                        if (N.rest)
                            z.items = this.process(N.rest, {
                                ...D,
                                path: [...D.path, 'items'],
                            });
                        let { minimum: Y, maximum: j } = $._zod.bag;
                        if (typeof Y === 'number') z.minItems = Y;
                        if (typeof j === 'number') z.maxItems = j;
                        break;
                    }
                    case 'record': {
                        let z = W;
                        (z.type = 'object'),
                            (z.propertyNames = this.process(N.keyType, {
                                ...D,
                                path: [...D.path, 'propertyNames'],
                            })),
                            (z.additionalProperties = this.process(
                                N.valueType,
                                {
                                    ...D,
                                    path: [...D.path, 'additionalProperties'],
                                },
                            ));
                        break;
                    }
                    case 'map': {
                        if (this.unrepresentable === 'throw')
                            throw new Error(
                                'Map cannot be represented in JSON Schema',
                            );
                        break;
                    }
                    case 'set': {
                        if (this.unrepresentable === 'throw')
                            throw new Error(
                                'Set cannot be represented in JSON Schema',
                            );
                        break;
                    }
                    case 'enum': {
                        let z = W,
                            B = Iv(N.entries);
                        if (B.every((Y) => typeof Y === 'number'))
                            z.type = 'number';
                        if (B.every((Y) => typeof Y === 'string'))
                            z.type = 'string';
                        z.enum = B;
                        break;
                    }
                    case 'literal': {
                        let z = W,
                            B = [];
                        for (let Y of N.values)
                            if (Y === void 0) {
                                if (this.unrepresentable === 'throw')
                                    throw new Error(
                                        'Literal `undefined` cannot be represented in JSON Schema',
                                    );
                            } else if (typeof Y === 'bigint')
                                if (this.unrepresentable === 'throw')
                                    throw new Error(
                                        'BigInt literals cannot be represented in JSON Schema',
                                    );
                                else B.push(Number(Y));
                            else B.push(Y);
                        if (B.length === 0);
                        else if (B.length === 1) {
                            let Y = B[0];
                            (z.type = Y === null ? 'null' : typeof Y),
                                (z.const = Y);
                        } else {
                            if (B.every((Y) => typeof Y === 'number'))
                                z.type = 'number';
                            if (B.every((Y) => typeof Y === 'string'))
                                z.type = 'string';
                            if (B.every((Y) => typeof Y === 'boolean'))
                                z.type = 'string';
                            if (B.every((Y) => Y === null)) z.type = 'null';
                            z.enum = B;
                        }
                        break;
                    }
                    case 'file': {
                        let z = W,
                            B = {
                                type: 'string',
                                format: 'binary',
                                contentEncoding: 'binary',
                            },
                            { minimum: Y, maximum: j, mime: K } = $._zod.bag;
                        if (Y !== void 0) B.minLength = Y;
                        if (j !== void 0) B.maxLength = j;
                        if (K)
                            if (K.length === 1)
                                (B.contentMediaType = K[0]),
                                    Object.assign(z, B);
                            else
                                z.anyOf = K.map((b) => {
                                    return { ...B, contentMediaType: b };
                                });
                        else Object.assign(z, B);
                        break;
                    }
                    case 'transform': {
                        if (this.unrepresentable === 'throw')
                            throw new Error(
                                'Transforms cannot be represented in JSON Schema',
                            );
                        break;
                    }
                    case 'nullable': {
                        let z = this.process(N.innerType, D);
                        W.anyOf = [z, { type: 'null' }];
                        break;
                    }
                    case 'nonoptional': {
                        this.process(N.innerType, D), (S.ref = N.innerType);
                        break;
                    }
                    case 'success': {
                        let z = W;
                        z.type = 'boolean';
                        break;
                    }
                    case 'default': {
                        this.process(N.innerType, D),
                            (S.ref = N.innerType),
                            (W.default = JSON.parse(
                                JSON.stringify(N.defaultValue),
                            ));
                        break;
                    }
                    case 'prefault': {
                        if (
                            (this.process(N.innerType, D),
                            (S.ref = N.innerType),
                            this.io === 'input')
                        )
                            W._prefault = JSON.parse(
                                JSON.stringify(N.defaultValue),
                            );
                        break;
                    }
                    case 'catch': {
                        this.process(N.innerType, D), (S.ref = N.innerType);
                        let z;
                        try {
                            z = N.catchValue(void 0);
                        } catch {
                            throw new Error(
                                'Dynamic catch values are not supported in JSON Schema',
                            );
                        }
                        W.default = z;
                        break;
                    }
                    case 'nan': {
                        if (this.unrepresentable === 'throw')
                            throw new Error(
                                'NaN cannot be represented in JSON Schema',
                            );
                        break;
                    }
                    case 'template_literal': {
                        let z = W,
                            B = $._zod.pattern;
                        if (!B)
                            throw new Error(
                                'Pattern not found in template literal',
                            );
                        (z.type = 'string'), (z.pattern = B.source);
                        break;
                    }
                    case 'pipe': {
                        let z =
                            this.io === 'input'
                                ? N.in._zod.def.type === 'transform'
                                    ? N.out
                                    : N.in
                                : N.out;
                        this.process(z, D), (S.ref = z);
                        break;
                    }
                    case 'readonly': {
                        this.process(N.innerType, D),
                            (S.ref = N.innerType),
                            (W.readOnly = !0);
                        break;
                    }
                    case 'promise': {
                        this.process(N.innerType, D), (S.ref = N.innerType);
                        break;
                    }
                    case 'optional': {
                        this.process(N.innerType, D), (S.ref = N.innerType);
                        break;
                    }
                    case 'lazy': {
                        let z = $._zod.innerType;
                        this.process(z, D), (S.ref = z);
                        break;
                    }
                    case 'custom': {
                        if (this.unrepresentable === 'throw')
                            throw new Error(
                                'Custom types cannot be represented in JSON Schema',
                            );
                        break;
                    }
                    default:
                }
            }
        }
        let J = this.metadataRegistry.get($);
        if (J) Object.assign(S.schema, J);
        if (this.io === 'input' && T($))
            delete S.schema.examples, delete S.schema.default;
        if (this.io === 'input' && S.schema._prefault)
            (U = S.schema).default ?? (U.default = S.schema._prefault);
        return delete S.schema._prefault, this.seen.get($).schema;
    }
    emit($, v) {
        let U = {
                cycles: v?.cycles ?? 'ref',
                reused: v?.reused ?? 'inline',
                external: v?.external ?? void 0,
            },
            N = this.seen.get($);
        if (!N) throw new Error('Unprocessed schema. This is a bug in Zod.');
        let I = (A) => {
                let D =
                    this.target === 'draft-2020-12' ? '$defs' : 'definitions';
                if (U.external) {
                    let B = U.external.registry.get(A[0])?.id,
                        Y = U.external.uri ?? ((K) => K);
                    if (B) return { ref: Y(B) };
                    let j =
                        A[1].defId ??
                        A[1].schema.id ??
                        `schema${this.counter++}`;
                    return (
                        (A[1].defId = j),
                        { defId: j, ref: `${Y('__shared')}#/${D}/${j}` }
                    );
                }
                if (A[1] === N) return { ref: '#' };
                let W = `${'#'}/${D}/`,
                    z = A[1].schema.id ?? `__schema${this.counter++}`;
                return { defId: z, ref: W + z };
            },
            P = (A) => {
                if (A[1].schema.$ref) return;
                let D = A[1],
                    { ref: G, defId: W } = I(A);
                if (((D.def = { ...D.schema }), W)) D.defId = W;
                let z = D.schema;
                for (let B in z) delete z[B];
                z.$ref = G;
            };
        if (U.cycles === 'throw')
            for (let A of this.seen.entries()) {
                let D = A[1];
                if (D.cycle)
                    throw new Error(`Cycle detected: #/${D.cycle?.join('/')}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
            }
        for (let A of this.seen.entries()) {
            let D = A[1];
            if ($ === A[0]) {
                P(A);
                continue;
            }
            if (U.external) {
                let W = U.external.registry.get(A[0])?.id;
                if ($ !== A[0] && W) {
                    P(A);
                    continue;
                }
            }
            if (this.metadataRegistry.get(A[0])?.id) {
                P(A);
                continue;
            }
            if (D.cycle) {
                P(A);
                continue;
            }
            if (D.count > 1) {
                if (U.reused === 'ref') {
                    P(A);
                    continue;
                }
            }
        }
        let S = (A, D) => {
            let G = this.seen.get(A),
                W = G.def ?? G.schema,
                z = { ...W };
            if (G.ref === null) return;
            let B = G.ref;
            if (((G.ref = null), B)) {
                S(B, D);
                let Y = this.seen.get(B).schema;
                if (Y.$ref && D.target === 'draft-7')
                    (W.allOf = W.allOf ?? []), W.allOf.push(Y);
                else Object.assign(W, Y), Object.assign(W, z);
            }
            if (!G.isParent)
                this.override({
                    zodSchema: A,
                    jsonSchema: W,
                    path: G.path ?? [],
                });
        };
        for (let A of [...this.seen.entries()].reverse())
            S(A[0], { target: this.target });
        let O = {};
        if (this.target === 'draft-2020-12')
            O.$schema = 'https://json-schema.org/draft/2020-12/schema';
        else if (this.target === 'draft-7')
            O.$schema = 'http://json-schema.org/draft-07/schema#';
        else console.warn(`Invalid target: ${this.target}`);
        if (U.external?.uri) {
            let A = U.external.registry.get($)?.id;
            if (!A) throw new Error('Schema is missing an `id` property');
            O.$id = U.external.uri(A);
        }
        Object.assign(O, N.def);
        let J = U.external?.defs ?? {};
        for (let A of this.seen.entries()) {
            let D = A[1];
            if (D.def && D.defId) J[D.defId] = D.def;
        }
        if (U.external);
        else if (Object.keys(J).length > 0)
            if (this.target === 'draft-2020-12') O.$defs = J;
            else O.definitions = J;
        try {
            return JSON.parse(JSON.stringify(O));
        } catch (A) {
            throw new Error('Error converting schema to JSON.');
        }
    }
}
function pN($, v) {
    if ($ instanceof Bv) {
        let N = new u6(v),
            I = {};
        for (let O of $._idmap.entries()) {
            let [J, A] = O;
            N.process(A);
        }
        let P = {},
            S = { registry: $, uri: v?.uri, defs: I };
        for (let O of $._idmap.entries()) {
            let [J, A] = O;
            P[J] = N.emit(A, { ...v, external: S });
        }
        if (Object.keys(I).length > 0) {
            let O = N.target === 'draft-2020-12' ? '$defs' : 'definitions';
            P.__shared = { [O]: I };
        }
        return { schemas: P };
    }
    let U = new u6(v);
    return U.process($), U.emit($, v);
}
function T($, v) {
    let U = v ?? { seen: new Set() };
    if (U.seen.has($)) return !1;
    U.seen.add($);
    let I = $._zod.def;
    switch (I.type) {
        case 'string':
        case 'number':
        case 'bigint':
        case 'boolean':
        case 'date':
        case 'symbol':
        case 'undefined':
        case 'null':
        case 'any':
        case 'unknown':
        case 'never':
        case 'void':
        case 'literal':
        case 'enum':
        case 'nan':
        case 'file':
        case 'template_literal':
            return !1;
        case 'array':
            return T(I.element, U);
        case 'object': {
            for (let P in I.shape) if (T(I.shape[P], U)) return !0;
            return !1;
        }
        case 'union': {
            for (let P of I.options) if (T(P, U)) return !0;
            return !1;
        }
        case 'intersection':
            return T(I.left, U) || T(I.right, U);
        case 'tuple': {
            for (let P of I.items) if (T(P, U)) return !0;
            if (I.rest && T(I.rest, U)) return !0;
            return !1;
        }
        case 'record':
            return T(I.keyType, U) || T(I.valueType, U);
        case 'map':
            return T(I.keyType, U) || T(I.valueType, U);
        case 'set':
            return T(I.valueType, U);
        case 'promise':
        case 'optional':
        case 'nonoptional':
        case 'nullable':
        case 'readonly':
            return T(I.innerType, U);
        case 'lazy':
            return T(I.getter(), U);
        case 'default':
            return T(I.innerType, U);
        case 'prefault':
            return T(I.innerType, U);
        case 'custom':
            return !1;
        case 'transform':
            return !0;
        case 'pipe':
            return T(I.in, U) || T(I.out, U);
        case 'success':
            return !1;
        case 'catch':
            return !1;
        default:
    }
    throw new Error(`Unknown schema type: ${I.type}`);
}
var fS = {};
var k6 = {};
Y$(k6, {
    time: () => dN,
    duration: () => eN,
    datetime: () => iN,
    date: () => tN,
    ZodISOTime: () => E6,
    ZodISODuration: () => q6,
    ZodISODateTime: () => c6,
    ZodISODate: () => F6,
});
var c6 = L('ZodISODateTime', ($, v) => {
    FI.init($, v), R.init($, v);
});
function iN($) {
    return zN(c6, $);
}
var F6 = L('ZodISODate', ($, v) => {
    EI.init($, v), R.init($, v);
});
function tN($) {
    return DN(F6, $);
}
var E6 = L('ZodISOTime', ($, v) => {
    qI.init($, v), R.init($, v);
});
function dN($) {
    return JN(E6, $);
}
var q6 = L('ZodISODuration', ($, v) => {
    kI.init($, v), R.init($, v);
});
function eN($) {
    return AN(q6, $);
}
var gS = ($, v) => {
        zv.init($, v),
            ($.name = 'ZodError'),
            Object.defineProperties($, {
                format: { value: (U) => Jv($, U) },
                flatten: { value: (U) => Dv($, U) },
                addIssue: { value: (U) => $.issues.push(U) },
                addIssues: { value: (U) => $.issues.push(...U) },
                isEmpty: {
                    get() {
                        return $.issues.length === 0;
                    },
                },
            });
    },
    DJ = L('ZodError', gS),
    h$ = L('ZodError', gS, { Parent: Error });
var aN = hv(h$),
    sN = ov(h$),
    $P = pv(h$),
    vP = iv(h$);
var c = L('ZodType', ($, v) => {
        return (
            w.init($, v),
            ($.def = v),
            Object.defineProperty($, '_def', { value: v }),
            ($.check = (...U) => {
                return $.clone({
                    ...v,
                    checks: [
                        ...(v.checks ?? []),
                        ...U.map((N) =>
                            typeof N === 'function'
                                ? {
                                      _zod: {
                                          check: N,
                                          def: { check: 'custom' },
                                          onattach: [],
                                      },
                                  }
                                : N,
                        ),
                    ],
                });
            }),
            ($.clone = (U, N) => l($, U, N)),
            ($.brand = () => $),
            ($.register = (U, N) => {
                return U.add($, N), $;
            }),
            ($.parse = (U, N) => aN($, U, N, { callee: $.parse })),
            ($.safeParse = (U, N) => $P($, U, N)),
            ($.parseAsync = async (U, N) =>
                sN($, U, N, { callee: $.parseAsync })),
            ($.safeParseAsync = async (U, N) => vP($, U, N)),
            ($.spa = $.safeParseAsync),
            ($.refine = (U, N) => $.check(cO(U, N))),
            ($.superRefine = (U) => $.check(FO(U))),
            ($.overwrite = (U) => $.check(z$(U))),
            ($.optional = () => C6($)),
            ($.nullable = () => r6($)),
            ($.nullish = () => C6(r6($))),
            ($.nonoptional = (U) => XO($, U)),
            ($.array = () => KP($)),
            ($.or = (U) => g6([$, U])),
            ($.and = (U) => vO($, U)),
            ($.transform = (U) => T6($, cP(U))),
            ($.default = (U) => LO($, U)),
            ($.prefault = (U) => GO($, U)),
            ($.catch = (U) => YO($, U)),
            ($.pipe = (U) => T6($, U)),
            ($.readonly = () => HO($)),
            ($.describe = (U) => {
                let N = $.clone();
                return $$.add(N, { description: U }), N;
            }),
            Object.defineProperty($, 'description', {
                get() {
                    return $$.get($)?.description;
                },
                configurable: !0,
            }),
            ($.meta = (...U) => {
                if (U.length === 0) return $$.get($);
                let N = $.clone();
                return $$.add(N, U[0]), N;
            }),
            ($.isOptional = () => $.safeParse(void 0).success),
            ($.isNullable = () => $.safeParse(null).success),
            $
        );
    }),
    NP = L('_ZodString', ($, v) => {
        K$.init($, v), c.init($, v);
        let U = $._zod.bag;
        ($.format = U.format ?? null),
            ($.minLength = U.minimum ?? null),
            ($.maxLength = U.maximum ?? null),
            ($.regex = (...N) => $.check(Mv(...N))),
            ($.includes = (...N) => $.check(Kv(...N))),
            ($.startsWith = (...N) => $.check(wv(...N))),
            ($.endsWith = (...N) => $.check(bv(...N))),
            ($.min = (...N) => $.check(G$(...N))),
            ($.max = (...N) => $.check(n$(...N))),
            ($.length = (...N) => $.check(y$(...N))),
            ($.nonempty = (...N) => $.check(G$(1, ...N))),
            ($.lowercase = (N) => $.check(Hv(N))),
            ($.uppercase = (N) => $.check(jv(N))),
            ($.trim = () => $.check(Fv())),
            ($.normalize = (...N) => $.check(cv(...N))),
            ($.toLowerCase = () => $.check(Ev())),
            ($.toUpperCase = () => $.check(qv()));
    }),
    Rv = L('ZodString', ($, v) => {
        K$.init($, v),
            NP.init($, v),
            ($.email = (U) => $.check(P6(PP, U))),
            ($.url = (U) => $.check(J6(SP, U))),
            ($.jwt = (U) => $.check(b6(HP, U))),
            ($.emoji = (U) => $.check(A6(OP, U))),
            ($.guid = (U) => $.check(Yv(Z6, U))),
            ($.uuid = (U) => $.check(S6(J$, U))),
            ($.uuidv4 = (U) => $.check(O6(J$, U))),
            ($.uuidv6 = (U) => $.check(z6(J$, U))),
            ($.uuidv7 = (U) => $.check(D6(J$, U))),
            ($.nanoid = (U) => $.check(L6(zP, U))),
            ($.guid = (U) => $.check(Yv(Z6, U))),
            ($.cuid = (U) => $.check(V6(DP, U))),
            ($.cuid2 = (U) => $.check(G6(JP, U))),
            ($.ulid = (U) => $.check(X6(AP, U))),
            ($.base64 = (U) => $.check(j6(YP, U))),
            ($.base64url = (U) => $.check(K6(QP, U))),
            ($.xid = (U) => $.check(W6(LP, U))),
            ($.ksuid = (U) => $.check(B6(VP, U))),
            ($.ipv4 = (U) => $.check(Y6(GP, U))),
            ($.ipv6 = (U) => $.check(Q6(XP, U))),
            ($.cidrv4 = (U) => $.check(M6(WP, U))),
            ($.cidrv6 = (U) => $.check(H6(BP, U))),
            ($.e164 = (U) => $.check(w6(MP, U))),
            ($.datetime = (U) => $.check(iN(U))),
            ($.date = (U) => $.check(tN(U))),
            ($.time = (U) => $.check(dN(U))),
            ($.duration = (U) => $.check(eN(U)));
    });
function IP($) {
    return PN(Rv, $);
}
var R = L('ZodStringFormat', ($, v) => {
        Z.init($, v), NP.init($, v);
    }),
    PP = L('ZodEmail', ($, v) => {
        QI.init($, v), R.init($, v);
    });
function AJ($) {
    return P6(PP, $);
}
var Z6 = L('ZodGUID', ($, v) => {
    BI.init($, v), R.init($, v);
});
function LJ($) {
    return Yv(Z6, $);
}
var J$ = L('ZodUUID', ($, v) => {
    YI.init($, v), R.init($, v);
});
function VJ($) {
    return S6(J$, $);
}
function GJ($) {
    return O6(J$, $);
}
function XJ($) {
    return z6(J$, $);
}
function WJ($) {
    return D6(J$, $);
}
var SP = L('ZodURL', ($, v) => {
    MI.init($, v), R.init($, v);
});
function BJ($) {
    return J6(SP, $);
}
var OP = L('ZodEmoji', ($, v) => {
    HI.init($, v), R.init($, v);
});
function YJ($) {
    return A6(OP, $);
}
var zP = L('ZodNanoID', ($, v) => {
    jI.init($, v), R.init($, v);
});
function QJ($) {
    return L6(zP, $);
}
var DP = L('ZodCUID', ($, v) => {
    KI.init($, v), R.init($, v);
});
function MJ($) {
    return V6(DP, $);
}
var JP = L('ZodCUID2', ($, v) => {
    wI.init($, v), R.init($, v);
});
function HJ($) {
    return G6(JP, $);
}
var AP = L('ZodULID', ($, v) => {
    bI.init($, v), R.init($, v);
});
function jJ($) {
    return X6(AP, $);
}
var LP = L('ZodXID', ($, v) => {
    uI.init($, v), R.init($, v);
});
function KJ($) {
    return W6(LP, $);
}
var VP = L('ZodKSUID', ($, v) => {
    cI.init($, v), R.init($, v);
});
function wJ($) {
    return B6(VP, $);
}
var GP = L('ZodIPv4', ($, v) => {
    ZI.init($, v), R.init($, v);
});
function bJ($) {
    return Y6(GP, $);
}
var XP = L('ZodIPv6', ($, v) => {
    RI.init($, v), R.init($, v);
});
function uJ($) {
    return Q6(XP, $);
}
var WP = L('ZodCIDRv4', ($, v) => {
    CI.init($, v), R.init($, v);
});
function cJ($) {
    return M6(WP, $);
}
var BP = L('ZodCIDRv6', ($, v) => {
    rI.init($, v), R.init($, v);
});
function FJ($) {
    return H6(BP, $);
}
var YP = L('ZodBase64', ($, v) => {
    xI.init($, v), R.init($, v);
});
function EJ($) {
    return j6(YP, $);
}
var QP = L('ZodBase64URL', ($, v) => {
    fI.init($, v), R.init($, v);
});
function qJ($) {
    return K6(QP, $);
}
var MP = L('ZodE164', ($, v) => {
    mI.init($, v), R.init($, v);
});
function kJ($) {
    return w6(MP, $);
}
var HP = L('ZodJWT', ($, v) => {
    gI.init($, v), R.init($, v);
});
function ZJ($) {
    return b6(HP, $);
}
var nS = L('ZodCustomStringFormat', ($, v) => {
    nI.init($, v), R.init($, v);
});
function RJ($, v, U = {}) {
    return _N(nS, $, v, U);
}
var Cv = L('ZodNumber', ($, v) => {
    v6.init($, v),
        c.init($, v),
        ($.gt = (N, I) => $.check(O$(N, I))),
        ($.gte = (N, I) => $.check(h(N, I))),
        ($.min = (N, I) => $.check(h(N, I))),
        ($.lt = (N, I) => $.check(S$(N, I))),
        ($.lte = (N, I) => $.check(d(N, I))),
        ($.max = (N, I) => $.check(d(N, I))),
        ($.int = (N) => $.check(UP(N))),
        ($.safe = (N) => $.check(UP(N))),
        ($.positive = (N) => $.check(O$(0, N))),
        ($.nonnegative = (N) => $.check(h(0, N))),
        ($.negative = (N) => $.check(S$(0, N))),
        ($.nonpositive = (N) => $.check(d(0, N))),
        ($.multipleOf = (N, I) => $.check(b$(N, I))),
        ($.step = (N, I) => $.check(b$(N, I))),
        ($.finite = () => $);
    let U = $._zod.bag;
    ($.minValue =
        Math.max(
            U.minimum ?? Number.NEGATIVE_INFINITY,
            U.exclusiveMinimum ?? Number.NEGATIVE_INFINITY,
        ) ?? null),
        ($.maxValue =
            Math.min(
                U.maximum ?? Number.POSITIVE_INFINITY,
                U.exclusiveMaximum ?? Number.POSITIVE_INFINITY,
            ) ?? null),
        ($.isInt =
            (U.format ?? '').includes('int') ||
            Number.isSafeInteger(U.multipleOf ?? 0.5)),
        ($.isFinite = !0),
        ($.format = U.format ?? null);
});
function yS($) {
    return LN(Cv, $);
}
var _$ = L('ZodNumberFormat', ($, v) => {
    yI.init($, v), Cv.init($, v);
});
function UP($) {
    return GN(_$, $);
}
function CJ($) {
    return XN(_$, $);
}
function rJ($) {
    return WN(_$, $);
}
function TJ($) {
    return BN(_$, $);
}
function xJ($) {
    return YN(_$, $);
}
var rv = L('ZodBoolean', ($, v) => {
    Av.init($, v), c.init($, v);
});
function hS($) {
    return QN(rv, $);
}
var Tv = L('ZodBigInt', ($, v) => {
    I6.init($, v),
        c.init($, v),
        ($.gte = (N, I) => $.check(h(N, I))),
        ($.min = (N, I) => $.check(h(N, I))),
        ($.gt = (N, I) => $.check(O$(N, I))),
        ($.gte = (N, I) => $.check(h(N, I))),
        ($.min = (N, I) => $.check(h(N, I))),
        ($.lt = (N, I) => $.check(S$(N, I))),
        ($.lte = (N, I) => $.check(d(N, I))),
        ($.max = (N, I) => $.check(d(N, I))),
        ($.positive = (N) => $.check(O$(BigInt(0), N))),
        ($.negative = (N) => $.check(S$(BigInt(0), N))),
        ($.nonpositive = (N) => $.check(d(BigInt(0), N))),
        ($.nonnegative = (N) => $.check(h(BigInt(0), N))),
        ($.multipleOf = (N, I) => $.check(b$(N, I)));
    let U = $._zod.bag;
    ($.minValue = U.minimum ?? null),
        ($.maxValue = U.maximum ?? null),
        ($.format = U.format ?? null);
});
function fJ($) {
    return HN(Tv, $);
}
var jP = L('ZodBigIntFormat', ($, v) => {
    hI.init($, v), Tv.init($, v);
});
function mJ($) {
    return KN(jP, $);
}
function gJ($) {
    return wN(jP, $);
}
var _S = L('ZodSymbol', ($, v) => {
    _I.init($, v), c.init($, v);
});
function nJ($) {
    return bN(_S, $);
}
var oS = L('ZodUndefined', ($, v) => {
    oI.init($, v), c.init($, v);
});
function yJ($) {
    return uN(oS, $);
}
var lS = L('ZodNull', ($, v) => {
    lI.init($, v), c.init($, v);
});
function pS($) {
    return cN(lS, $);
}
var iS = L('ZodAny', ($, v) => {
    pI.init($, v), c.init($, v);
});
function hJ() {
    return FN(iS);
}
var tS = L('ZodUnknown', ($, v) => {
    f$.init($, v), c.init($, v);
});
function R6() {
    return m$(tS);
}
var dS = L('ZodNever', ($, v) => {
    iI.init($, v), c.init($, v);
});
function x6($) {
    return EN(dS, $);
}
var eS = L('ZodVoid', ($, v) => {
    tI.init($, v), c.init($, v);
});
function _J($) {
    return qN(eS, $);
}
var f6 = L('ZodDate', ($, v) => {
    dI.init($, v),
        c.init($, v),
        ($.min = (N, I) => $.check(h(N, I))),
        ($.max = (N, I) => $.check(d(N, I)));
    let U = $._zod.bag;
    ($.minDate = U.minimum ? new Date(U.minimum) : null),
        ($.maxDate = U.maximum ? new Date(U.maximum) : null);
});
function oJ($) {
    return kN(f6, $);
}
var aS = L('ZodArray', ($, v) => {
    Lv.init($, v),
        c.init($, v),
        ($.element = v.element),
        ($.min = (U, N) => $.check(G$(U, N))),
        ($.nonempty = (U) => $.check(G$(1, U))),
        ($.max = (U, N) => $.check(n$(U, N))),
        ($.length = (U, N) => $.check(y$(U, N))),
        ($.unwrap = () => $.element);
});
function KP($, v) {
    return kv(aS, $, v);
}
function lJ($) {
    let v = $._zod.def.shape;
    return zO(Object.keys(v));
}
var m6 = L('ZodObject', ($, v) => {
    eI.init($, v),
        c.init($, v),
        H.defineLazy($, 'shape', () => v.shape),
        ($.keyof = () => SO(Object.keys($._zod.def.shape))),
        ($.catchall = (U) => $.clone({ ...$._zod.def, catchall: U })),
        ($.passthrough = () => $.clone({ ...$._zod.def, catchall: R6() })),
        ($.loose = () => $.clone({ ...$._zod.def, catchall: R6() })),
        ($.strict = () => $.clone({ ...$._zod.def, catchall: x6() })),
        ($.strip = () => $.clone({ ...$._zod.def, catchall: void 0 })),
        ($.extend = (U) => {
            return H.extend($, U);
        }),
        ($.merge = (U) => H.merge($, U)),
        ($.pick = (U) => H.pick($, U)),
        ($.omit = (U) => H.omit($, U)),
        ($.partial = (...U) => H.partial(FP, $, U[0])),
        ($.required = (...U) => H.required(EP, $, U[0]));
});
function pJ($, v) {
    let U = {
        type: 'object',
        get shape() {
            return H.assignProp(this, 'shape', { ...$ }), this.shape;
        },
        ...H.normalizeParams(v),
    };
    return new m6(U);
}
function iJ($, v) {
    return new m6({
        type: 'object',
        get shape() {
            return H.assignProp(this, 'shape', { ...$ }), this.shape;
        },
        catchall: x6(),
        ...H.normalizeParams(v),
    });
}
function tJ($, v) {
    return new m6({
        type: 'object',
        get shape() {
            return H.assignProp(this, 'shape', { ...$ }), this.shape;
        },
        catchall: R6(),
        ...H.normalizeParams(v),
    });
}
var wP = L('ZodUnion', ($, v) => {
    U6.init($, v), c.init($, v), ($.options = v.options);
});
function g6($, v) {
    return new wP({ type: 'union', options: $, ...H.normalizeParams(v) });
}
var sS = L('ZodDiscriminatedUnion', ($, v) => {
    wP.init($, v), aI.init($, v);
});
function dJ($, v, U) {
    return new sS({
        type: 'union',
        options: v,
        discriminator: $,
        ...H.normalizeParams(U),
    });
}
var $O = L('ZodIntersection', ($, v) => {
    sI.init($, v), c.init($, v);
});
function vO($, v) {
    return new $O({ type: 'intersection', left: $, right: v });
}
var IO = L('ZodTuple', ($, v) => {
    w$.init($, v),
        c.init($, v),
        ($.rest = (U) => $.clone({ ...$._zod.def, rest: U }));
});
function eJ($, v, U) {
    let N = v instanceof w,
        I = N ? U : v;
    return new IO({
        type: 'tuple',
        items: $,
        rest: N ? v : null,
        ...H.normalizeParams(I),
    });
}
var bP = L('ZodRecord', ($, v) => {
    $U.init($, v),
        c.init($, v),
        ($.keyType = v.keyType),
        ($.valueType = v.valueType);
});
function UO($, v, U) {
    return new bP({
        type: 'record',
        keyType: $,
        valueType: v,
        ...H.normalizeParams(U),
    });
}
function aJ($, v, U) {
    return new bP({
        type: 'record',
        keyType: g6([$, x6()]),
        valueType: v,
        ...H.normalizeParams(U),
    });
}
var NO = L('ZodMap', ($, v) => {
    vU.init($, v),
        c.init($, v),
        ($.keyType = v.keyType),
        ($.valueType = v.valueType);
});
function sJ($, v, U) {
    return new NO({
        type: 'map',
        keyType: $,
        valueType: v,
        ...H.normalizeParams(U),
    });
}
var PO = L('ZodSet', ($, v) => {
    IU.init($, v),
        c.init($, v),
        ($.min = (...U) => $.check(u$(...U))),
        ($.nonempty = (U) => $.check(u$(1, U))),
        ($.max = (...U) => $.check(g$(...U))),
        ($.size = (...U) => $.check(Qv(...U)));
});
function $A($, v) {
    return new PO({ type: 'set', valueType: $, ...H.normalizeParams(v) });
}
var Zv = L('ZodEnum', ($, v) => {
    UU.init($, v),
        c.init($, v),
        ($.enum = v.entries),
        ($.options = Object.values(v.entries));
    let U = new Set(Object.keys(v.entries));
    ($.extract = (N, I) => {
        let P = {};
        for (let S of N)
            if (U.has(S)) P[S] = v.entries[S];
            else throw new Error(`Key ${S} not found in enum`);
        return new Zv({
            ...v,
            checks: [],
            ...H.normalizeParams(I),
            entries: P,
        });
    }),
        ($.exclude = (N, I) => {
            let P = { ...v.entries };
            for (let S of N)
                if (U.has(S)) delete P[S];
                else throw new Error(`Key ${S} not found in enum`);
            return new Zv({
                ...v,
                checks: [],
                ...H.normalizeParams(I),
                entries: P,
            });
        });
});
function SO($, v) {
    let U = Array.isArray($) ? Object.fromEntries($.map((N) => [N, N])) : $;
    return new Zv({ type: 'enum', entries: U, ...H.normalizeParams(v) });
}
function vA($, v) {
    return new Zv({ type: 'enum', entries: $, ...H.normalizeParams(v) });
}
var OO = L('ZodLiteral', ($, v) => {
    NU.init($, v),
        c.init($, v),
        ($.values = new Set(v.values)),
        Object.defineProperty($, 'value', {
            get() {
                if (v.values.length > 1)
                    throw new Error(
                        'This schema contains multiple valid literal values. Use `.values` instead.',
                    );
                return v.values[0];
            },
        });
});
function zO($, v) {
    return new OO({
        type: 'literal',
        values: Array.isArray($) ? $ : [$],
        ...H.normalizeParams(v),
    });
}
var DO = L('ZodFile', ($, v) => {
    PU.init($, v),
        c.init($, v),
        ($.min = (U, N) => $.check(u$(U, N))),
        ($.max = (U, N) => $.check(g$(U, N))),
        ($.mime = (U, N) => $.check(uv(Array.isArray(U) ? U : [U], N)));
});
function IA($) {
    return gN(DO, $);
}
var uP = L('ZodTransform', ($, v) => {
    Vv.init($, v),
        c.init($, v),
        ($._zod.parse = (U, N) => {
            U.addIssue = (P) => {
                if (typeof P === 'string')
                    U.issues.push(H.issue(P, U.value, v));
                else {
                    let S = P;
                    if (S.fatal) S.continue = !1;
                    S.code ?? (S.code = 'custom'),
                        S.input ?? (S.input = U.value),
                        S.inst ?? (S.inst = $),
                        S.continue ?? (S.continue = !0),
                        U.issues.push(H.issue(S));
                }
            };
            let I = v.transform(U.value, U);
            if (I instanceof Promise)
                return I.then((P) => {
                    return (U.value = P), U;
                });
            return (U.value = I), U;
        });
});
function cP($) {
    return new uP({ type: 'transform', transform: $ });
}
var FP = L('ZodOptional', ($, v) => {
    SU.init($, v), c.init($, v), ($.unwrap = () => $._zod.def.innerType);
});
function C6($) {
    return new FP({ type: 'optional', innerType: $ });
}
var JO = L('ZodNullable', ($, v) => {
    OU.init($, v), c.init($, v), ($.unwrap = () => $._zod.def.innerType);
});
function r6($) {
    return new JO({ type: 'nullable', innerType: $ });
}
function UA($) {
    return C6(r6($));
}
var AO = L('ZodDefault', ($, v) => {
    zU.init($, v),
        c.init($, v),
        ($.unwrap = () => $._zod.def.innerType),
        ($.removeDefault = $.unwrap);
});
function LO($, v) {
    return new AO({
        type: 'default',
        innerType: $,
        get defaultValue() {
            return typeof v === 'function' ? v() : v;
        },
    });
}
var VO = L('ZodPrefault', ($, v) => {
    DU.init($, v), c.init($, v), ($.unwrap = () => $._zod.def.innerType);
});
function GO($, v) {
    return new VO({
        type: 'prefault',
        innerType: $,
        get defaultValue() {
            return typeof v === 'function' ? v() : v;
        },
    });
}
var EP = L('ZodNonOptional', ($, v) => {
    JU.init($, v), c.init($, v), ($.unwrap = () => $._zod.def.innerType);
});
function XO($, v) {
    return new EP({
        type: 'nonoptional',
        innerType: $,
        ...H.normalizeParams(v),
    });
}
var WO = L('ZodSuccess', ($, v) => {
    AU.init($, v), c.init($, v), ($.unwrap = () => $._zod.def.innerType);
});
function NA($) {
    return new WO({ type: 'success', innerType: $ });
}
var BO = L('ZodCatch', ($, v) => {
    LU.init($, v),
        c.init($, v),
        ($.unwrap = () => $._zod.def.innerType),
        ($.removeCatch = $.unwrap);
});
function YO($, v) {
    return new BO({
        type: 'catch',
        innerType: $,
        catchValue: typeof v === 'function' ? v : () => v,
    });
}
var QO = L('ZodNaN', ($, v) => {
    VU.init($, v), c.init($, v);
});
function PA($) {
    return RN(QO, $);
}
var qP = L('ZodPipe', ($, v) => {
    Gv.init($, v), c.init($, v), ($.in = v.in), ($.out = v.out);
});
function T6($, v) {
    return new qP({ type: 'pipe', in: $, out: v });
}
var MO = L('ZodReadonly', ($, v) => {
    GU.init($, v), c.init($, v);
});
function HO($) {
    return new MO({ type: 'readonly', innerType: $ });
}
var jO = L('ZodTemplateLiteral', ($, v) => {
    XU.init($, v), c.init($, v);
});
function SA($, v) {
    return new jO({
        type: 'template_literal',
        parts: $,
        ...H.normalizeParams(v),
    });
}
var KO = L('ZodLazy', ($, v) => {
    BU.init($, v), c.init($, v), ($.unwrap = () => $._zod.def.getter());
});
function wO($) {
    return new KO({ type: 'lazy', getter: $ });
}
var bO = L('ZodPromise', ($, v) => {
    WU.init($, v), c.init($, v), ($.unwrap = () => $._zod.def.innerType);
});
function OA($) {
    return new bO({ type: 'promise', innerType: $ });
}
var n6 = L('ZodCustom', ($, v) => {
    YU.init($, v), c.init($, v);
});
function uO($) {
    let v = new C({ check: 'custom' });
    return (v._zod.check = $), v;
}
function zA($, v) {
    return nN(n6, $ ?? (() => !0), v);
}
function cO($, v = {}) {
    return yN(n6, $, v);
}
function FO($) {
    let v = uO((U) => {
        return (
            (U.addIssue = (N) => {
                if (typeof N === 'string')
                    U.issues.push(H.issue(N, U.value, v._zod.def));
                else {
                    let I = N;
                    if (I.fatal) I.continue = !1;
                    I.code ?? (I.code = 'custom'),
                        I.input ?? (I.input = U.value),
                        I.inst ?? (I.inst = v),
                        I.continue ?? (I.continue = !v._zod.def.abort),
                        U.issues.push(H.issue(I));
                }
            }),
            $(U.value, U)
        );
    });
    return v;
}
function DA($, v = { error: `Input not instance of ${$.name}` }) {
    let U = new n6({
        type: 'custom',
        check: 'custom',
        fn: (N) => N instanceof $,
        abort: !0,
        ...H.normalizeParams(v),
    });
    return (U._zod.bag.Class = $), U;
}
var JA = (...$) =>
    hN({ Pipe: qP, Boolean: rv, String: Rv, Transform: uP }, ...$);
function AA($) {
    let v = wO(() => {
        return g6([IP($), yS(), hS(), pS(), KP(v), UO(IP(), v)]);
    });
    return v;
}
function LA($, v) {
    return T6(cP($), v);
}
var VA = {
    invalid_type: 'invalid_type',
    too_big: 'too_big',
    too_small: 'too_small',
    invalid_format: 'invalid_format',
    not_multiple_of: 'not_multiple_of',
    unrecognized_keys: 'unrecognized_keys',
    invalid_union: 'invalid_union',
    invalid_key: 'invalid_key',
    invalid_element: 'invalid_element',
    invalid_value: 'invalid_value',
    custom: 'custom',
};
function GA($) {
    r({ customError: $ });
}
function XA() {
    return r().customError;
}
var kP;
(function ($) {})(kP || (kP = {}));
var ZP = {};
Y$(ZP, {
    string: () => WA,
    number: () => BA,
    date: () => MA,
    boolean: () => YA,
    bigint: () => QA,
});
function WA($) {
    return SN(Rv, $);
}
function BA($) {
    return VN(Cv, $);
}
function YA($) {
    return MN(rv, $);
}
function QA($) {
    return jN(Tv, $);
}
function MA($) {
    return ZN(f6, $);
}
r(Xv());
var e = f.object({
    APP_NAME: f.string(),
    APP_HOST: f.url(),
    APP_IP: f.ipv4(),
    MODE: f.literal(['DEVELOPMENT', 'PRODUCTION', 'BUILDING', 'PREVIEW']),
    PORT_BOT_APP: f.coerce.number(),
    PORT_MINIAPP_APP: f.coerce.number(),
    PORT_API_APP: f.coerce.number(),
    PORT_ADMIN_APP: f.coerce.number(),
    SUB_BOT_APP: f.string(),
    SUB_MINIAPP_APP: f.string(),
    SUB_API_APP: f.string(),
    SUB_ADMIN_APP: f.string(),
    TELEGRAM_BOT_TOKEN: f.string().min(10),
    TELEGRAM_BOT_TESTING_TOKEN: f.string().min(10),
});
var HA = e.pick({
        PORT_BOT_APP: !0,
        TELEGRAM_BOT_TESTING_TOKEN: !0,
        TELEGRAM_BOT_TOKEN: !0,
    }),
    EO = ($) => HA.parse($);
var iX = e.pick({
    SUB_ADMIN_APP: !0,
    SUB_API_APP: !0,
    SUB_BOT_APP: !0,
    SUB_MINIAPP_APP: !0,
});
var jA = e.pick({
        PORT_ADMIN_APP: !0,
        PORT_API_APP: !0,
        PORT_BOT_APP: !0,
        PORT_MINIAPP_APP: !0,
    }),
    qO = ($) => jA.parse($);
var sX = e.pick({ APP_HOST: !0, APP_IP: !0, APP_NAME: !0 });
var KA = e.pick({ MODE: !0 }),
    kO = ($) => KA.parse($).MODE;
var NW = e.pick({ PORT_API_APP: !0 });
import wA from 'os';
var ZO = () => {
    let $ = wA.networkInterfaces(),
        v = [];
    for (let U in $)
        if ($[U]) {
            for (let N of $[U])
                if (N.family == 'IPv4' && !N.internal) v.push(N.address);
        }
    return v;
};
var RP = EO(Bun.env),
    y6 = kO(Bun.env),
    h6 = y6 === 'DEVELOPMENT' || y6 == 'PREVIEW';
var B1 = K1(X1(), 1),
    bV = qO(Bun.env),
    W1 = ZO(),
    JS = new B1.Bot(
        h6 ? RP.TELEGRAM_BOT_TESTING_TOKEN : RP.TELEGRAM_BOT_TOKEN,
        { client: { environment: h6 ? 'test' : 'prod', fetch: Bun.fetch } },
    );
JS.command('start', async ($) => {
    await $.reply('Hi, How are you!');
});
JS.command('app', async ($) => {
    if (!h6) {
        await $.reply(
            '\u041D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u043E!',
        );
        return;
    }
    if (W1.length) {
        let v = new URL(`http:${W1[0]}`);
        (v.protocol = 'http'),
            (v.port = `${bV.PORT_ADMIN_APP}`),
            await $.reply('Nate', {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: 'Open MiniApp', web_app: { url: v.href } }],
                    ],
                },
            });
    } else
        await $.reply(
            '\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u0433\u0435\u043D\u0435\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443!',
        );
});
var Y1 = JS;
if (import.meta.main)
    Y1.start({
        onStart($) {
            console.log(`Bot started in ${y6} mode!`);
        },
    });

//# debugId=8B477E732643CC8C64756E2164756E21
