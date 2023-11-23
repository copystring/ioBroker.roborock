"use strict";

const { createCanvas } = require("canvas");
const { Image } = require("canvas");

// Farben ändern
const colors = {
	floor: "#23465e",
	obstacle: "#2b2e30",
	path: "rgba(255,255,255,0.5)",
	newmap: true,
};
const orgcolors = [
	"#017E82",
	"#BD7B00",
	"#C05A41",
	"#4579B5",
	"#434242", // wall
	"#dfdfdf", // desel floor
];
const offset = 60;

const robot =
	"data:image/png;base64,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";
const robot1 =
	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAfCAMAAAHGjw8oAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADbUExURQAAAICAgICAgICAgICAgICAgHx8fH19fX19fYCAgIGBgX5+foCAgH5+foCAgH9/f39/f35+foCAgH9/f39/f4CAgH5+foGBgYCAgICAgIGBgX9/f39/f35+foCAgH9/f39/f4CAgIODg4eHh4mJiZCQkJycnJ2dnZ6enqCgoKSkpKenp62trbGxsbKysry8vL29vcLCwsXFxcbGxsvLy87OztPT09XV1d/f3+Tk5Ojo6Ozs7O3t7e7u7vHx8fLy8vPz8/X19fb29vf39/j4+Pn5+f39/f7+/v///9yECocAAAAgdFJOUwAGChgcKCkzOT5PVWZnlJmfsLq7wcrS1Nre4OXz+vr7ZhJmqwAAAAlwSFlzAAAXEQAAFxEByibzPwAAAcpJREFUKFNlkolaWkEMhYPggliBFiwWhGOx3AqCsggI4lZt8/5P5ElmuEX5P5hMMjeZJBMRafCvUKnbIqpcioci96owTQWqP0QKC54nImUAyr9k7VD1me4YvibHlJKpVUzQhR+dmdTRSDUvdHh8NK8nhqUVch7cITmXA3rtYDmH+3OL4XI1T+BhJUcXczQxOBXJuve0/daeUr5A6g9muJzo5NI2kPKtyRSGBStKQZ5RC1hENWn6NSRTrDUqLD/lsNKoFTNRETlGMn9dDoGdoDcT1fHPi7EuUDD9dMBw4+6vMQVyInnPXDsdW+8tjWfbYTbzg/OstcagzSlb0+wL/6k+1KPhCrj6YFhzS5eXuHcYNF4bsGtDYhFLTOSMqTsx9e3iyKfynb1SK+RqtEq70RzZPwEGKwv7G0OK1QA42Y+HIgct9P3WWG9ItI/mQTgvoeuWAMdlTRclO/+Km2jwlhDvinGNbyJH6EWV84AJ1wl8JowejqTqTmv+0GqDmVLlg/wLX5Mp2rO3WRs2Zs5fznAVd1EzRh10OONr7hhhM4ctevhiVVxHdYsbq+JzHzaIfdjs5CZ9tGInSfoWEXuL7//fwtn9+Jp7wSryDjBFqnOGeuUxAAAAAElFTkSuQmCC";
const charger =
	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAdVBMVEUAAAA44Yo44Yo44Yo44Yo44Yo44Yo44Yo44Yp26q844Yr///9767Kv89DG9t2g8Md26q5C44/5/vvz/fjY+ei19NNV5ZtJ45T2/fmY78KP7r1v6atq6Kjs/PPi+u7e+uvM9+Gb8MSS7r+H7bhm6KVh56JZ5p3ZkKITAAAACnRSTlMABTr188xpJ4aepd0A4wAAANZJREFUKM9VklmCgzAMQwkQYCSmLKWl2+zL/Y9YcIUL7wvkJHIUJyKkVcyy+JIGCZILGF//QLEqlTmMdsBEXi56igfH/QVGqvXSu49+1KftCbn+dtxB5LOPfNGQNRaKaQNkTJ46OMGczZg8wJB/9TB+J3nFkyqJMp44vBrnWYhJJmOn/5uVzAotV/zACnbUtTbOpHcQzVx8kxw6mavdpYP90dsNcE5k6xd8RoIb2Xgk6xAbfm5C9NiHtxGiXD/U2P96UJunrS/LOeV2GG4wfBi241P5+NwBnAEUFx9FUdUAAAAASUVORK5CYII=";
const tank =
	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAzCAYAAAD2OArBAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAC9AAAAvQBgK2sVQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAApASURBVFiFpZhLbJzVFcd/3zfffPO0PeNx/Irj2AHyoiHEJUEQEqJCIa1aaLtBgkZtxaKVWHRHBZXoqpGo1EWXlbqoaFW1VReoi5aHWkDQSglgCCQ0OE7sOI49M573+3t3ccaeZ9xUHOmTx/dxzrnn/s//nnuV2ARnBmK84ljguWyJbUOtwJlqict8AYlNcyAS4hXX6u2rFjmj7DqA99yvoZAEsyEdjgPZDXjnT5CIfxHz4ITg2z+ESq637/cv4WmOJcazG2AY0mE2IJuE2B44+bUv5sB/LojxQkGiCmCbUC2BUQfNdcWgYYBpthwwGuC6kMn0V3z1Aix9Cq4NU3vh4IO38MBrGrXb9Ncgn5E2zfPEmNEA0wBFbc01s5BPg2WKM66zpY+Vy3DPl+9mNXOJG1cgFAM91Gt/M6og+j1X9DkOeB6ongeWDXYDLAOy650Kjp6EfYdg910wOQsTu+ULD8D3nznN9B1QTEJxHRRHvmAAhnfA+K5OXZl1CX29KtHwPNA0DYYTskLThHKhNaHRgGwKFuZh8XyXsg14f+2XFDIwvQ+OPQqqBuUsZJJQzEBiojciw2OyBZYBqgqq6woYDKMzXACWJW3jMxAKwMonsHIBynnwR+APL8On/4SxSfjBUz/hxFf3ceg4DI9CPguZdAsDm+J58m2KZlmQXJeVmgbowc4JlQoMxeE7z4vhdBI21uCTd+H+x2DtOtgunLvxMrYhmIkkYHBAgBbVWrr0AKRWJNqVimBK8/thYif4A50obZdiHsJh8Ovy+fzSPrUHDBOSC4IDowHZjKRwo9ob/pGJNv0eqD5Qe4f1l1wGblwT5Y4NwTCc2vszABqGhHvTeCYtbbcj2zqgKK3fhgGeCuEhiI9KJKajj4sDVcikILMmfwtp0TwwBP7Y9g5o23VGo13e+jr/32h8BECtAmtXBbTFHNgVCMRlzz2FbeW2t6CfvJN8DgDHglwKChvgOWI8PgqJ0f+tQzPqvPjxPzg7dbj/gI21/u3tINNDMDgm6IZmfqtQ6wPETUkvgGvyopZf5833/szZ+0yYOtQ5SI/Dg6eF5boltQCFVUivSqrfsQ9G+xDPpY9729YXYPHfYJu8oQGY9Wb+NrlgK3Qq3FwUouqJQEOywbGhVoaNZCs9NyUQlEh0i23IiQhtIIyPwM5ZWOoqPwo5KOUE0Y4jbZWyMN2mVLLCAwOx1jbkMq283062HLAsWVU/CUUgMSapaFtSOzg25POtMYNxiI2Ik41q6zi/bQe2E9eFeg3OvS7KPQ+sOjSaW6OH4bN5WPxMwn7HveLA7UgrAoYck7eSy+chcxMOn4K9h+D9v4sDtg3hGEzug9174a0/yvE+OPb/OmCBUYNoH+bKp2FkCsZ3w+pyqz2XgnobQG9ekZrBbOq6HdnCaDgKsR0CpG7JJQUD952CQurWylYuw847QfNDvXKbDkQGScw9DgeP9x9Qr8D4NBw8BlYDjpyEhQ+lr1oFswnE9Ao8+SzcdRDGdoHqCk76ycR+2HUItAAJNT7Ja19/rj9nuybk1mBsCswqFAsQGRRQlotNlLtCxbFhSVVVk3ItFIXUcqsSbhfND7MPQCDK66ptQq3QO8iywCwKB9x7Aho1Qf9ADIIRuHEVCutSwhlV+NIxyQDbkXpwxxQsXxI6tvpcSra2oF+jZQu4ajV4/AxYNfjgb639H5+BmQMSYleBA0dh5wxUy516IgOQuQGptf6RgD484FhQykBuBbJXYHo/VFJQzcO/XoVHvieKn3gWAs0y3HPBMVu8sCnBsND0hXdla0ampMZop2fVdSVMtYp8uQwsfQypi6CFRbFlwtEnobYB5/8ByxcEG42KfNUSFIstqm6XcBSun4PlD0DzCT27beM01Qf+EPgU+VaXBFxaUG49ZtOAbcPBh+HD1+FiGh7+Lhx4CM6/0VKmAEcf69pOE7SQzM8lId5FUKqqSMEZjYGqgF2HekbKbsfsHHzgOBglmDgMkTF4769w5GG471E4MAeTe+Dtv0AuLSnquFBcAT0q2+S5UCt1OeC6kt+WJXuo+mQppRsQGukN6ekfwcbnUguUsnDikf08843nueck3H1UyvtSoXUNC0ShsCwRdZzWDXxrC9r/sS2wClJ4ug4EhnsdGEjAvgdg8RI89jTcTF4mlb9MIQW5LBx6CObfgcQ4eLYcVPFdoA7AwtsQeAISI63DSnUcmZheg2TzkrHzbrjzYbm2d8vgDjjxFCQmhZhy663rfTYFxWzn+JEZ2P8VibBVh0i0lT0AmqpAKCQI9QchvAP0SOchcyspZCCbBV0X45mUvAO0S2io83/XkYpoU1RFhVBYnAiEQQvI0WwZgCNMp/o67wgAx78JCx9ITZhelwhmUpBehLvmIDwMLmBURJfnwPRDvYvYwoDPL28DZh0WLwv3mxvw6m/g6R8LqMy2rND8gvqrn4KmSZlWz8PgiKDfqMtxvfYRDExCNQXxSbHRXjtucZIekkioKrgWFFflb+YmLF6Usqy7wLz/NAwOSUh9ioR7535xtFEEty7Azq+C3awPQuEuDLQr1HWh2doO8KfAKkE+BStXYGY/VLpyGODIKUmtfEYqY8uS6BlVMAqg+mFoGiIxiI2KjXbpWJPqk9CGB+RkAzkbzr0mURjq82KmKBLuRlV+l8vyu7AsRKYoAurIiNzAu693HQ5EYuDzyVmuBgBFJlkGrHwuROJv2796RdIumxLmazTEaC0NjgH+YTEYjEMkLrojsW0cACmtg1EI7JDwBaNyiZh/S8pyzSfgyqXkzSeXlmPbtsUBqyz1hW1BcBD8gzA8LlkW68OsmmXB+s3WC4miyuD4MBQH5RgNRFoTHAdKeXHGsqRIcZzmE08enCbDBWKyAEWBREJWPzDUx4FQBPbPQeq6OLBwSS4ZoYRQaDQKdkyI6Xe/ENCVy61LR7kslAsS/kIGXAMSs5I5gTAMJSTL1q4Dnsytbj7R2CYUU/JmY5pypOp+iUJ0AOJTkF+HgCbovrnU+ejoOfIesClWuZnSQxCfAFWHiV1QKkm0JmfkiUZJNkHfGxQRXQd9AKKDQhymCbWivAHkrtxqFmDCxBGITcoiUHpTrwcDa6tNDHSd/2pQ7n92Hcyy7LWmgD4IjSxYbSsPJmBoVLLGtaGSF1COjm/jLG2vZHpQgKQgdLwp9QqE7QQjw8Pouk46XWf8oN4sxUxCoRCeahKMgB7Q0bQ6uq6T3Fil4XTeTvw6rC93YUD1yZntJKUwAbmItpfSD849yol7vsXs7Czz8/PMzs6iKArXrl1jbm6OpaUlgI7+X/32Ja5V3sdxoFyS2nGTyOpVSVPVB8rYDGePPckLakToFMR4vfl66pgw5T+MVxxmz549WwYAlpaWthzwPK+jf/7qm+hTZQbiMBRrPUhs6k8uwPpFzipAJL6Hn7oWL9htoXdd8EJABVQ3gG14BOIBapkagUAAAMMwCIfDmKaJ53kEAgFqNek3nRpaUHilm34BPIuztSI//y936+fVngzyYwAAAABJRU5ErkJggg==";
const spaceship =
	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAFMklEQVRYR+2YfUxVZRjAf+cAfiAOHZaIFxXD0g2V3LVipZFuOrRcm6KBHw0b/GHERpFGfoQokcV0M6x5mbiKyFK31NRls666RmUrP0gtUVQU8IP8AEGBe297zznXe+71fsBB+4v3D8Z97/M85/c+X+9zj8SDW7eBUJ25XsDdrpqXumpAp29jSoZMTDxsXCS2+wJNXbX/YAFTVsqMeg5WTO4GNBIZG90eNOI3l063B434zwK8oCnGkrISXRWfARzAT0CGEeNCp6ttppHIYWFExYIkQc4mCOsHeclw6wY01MC/taIXip5oaHUdMPmtMBa85/7w+jq4egX2bQRrWTegv9A00u1BQ6l7T6nbgx2tYiGXCsia7yqAKqAzHowFEjR9O1Cu9Um/Mewo4ETgQJAsYXc4cDi4CER3ErBGkjDJkoTNLvo3zwMHA2VYRwGFMaujLonk9D/Z9l29IcBZL0aatpY8iTRor+BKFId+oIDj48Opqm7m+s02Q4D9w0NMsTGhHD5y8+EAYhoJDZegpdEQIL37mogYDBdPPSTA9w9B+XKotBoDjEs0kboK3p3QacBSYIEuHyZ5JLCSg/gDnPkotLeqJuRgyN/veRfX4B9QFOKPOobPgYXOIjk8tFc/85LoZ8ms2iMqdSGwWSfsH3D+CpgRzkcrRioqb+efgoKD8INFPywEAkyTJam0OHYaa2p+5vydG78D4+8BxodFmnePnsuQX9Zhc9gDAV4CHgOuKXexBlhVIc4BsQkHPAEHAGeISxzsJ8RpQZJceuGZbKYf/5IjTfXugIBZ5zHvgJZTsHkJVOxwic5dCnMWKx50A7SchN2fwo71Ltn4qTB7ma8cTANEqjmXB2DUE2bS18OqaWC3eQfcdUtVbm50mQnti+jc9wHuvKkOsXrZM2dVPe9FkoYcVMryPVCSBbV/ewCaRppZVALLEvWAInHF64zRwIc4AZ14l8/DpdMqYN5MNq0TYvBa9nHI264CDh4BA4eqGseP6gEXix1xXK0gVcDVVvgkXbSigIBlQKvyELFCesL2K7oIALOjoKVJERGM92QdDtde7zD4plbVa9Ve1aREu/5XfrbQA5hnDHBLDfQJdwdzfkoeRG56JAW5jyNH7QWL5qGMsdhrk1ha+A+FJfWwtc5d32aDE5VwpwnykwwBVgLi2FMIADh8oIMRMaF8b73mBjg1cQCnq5s5e1nqCOA+IAo5KM53iEeMM7PWCgWpcP6EeuLgECj+FWTnlOXhyOIsOKYNJELmYzGFAW8kgF1MVMCYiZCpq2S9CSGT+TS0t6m7EdGQutpHDjoBvQfz/9mtOg0tzT4AJcmseEy/JBm+vgjBIoe9rJxJcPaY9oUEX4gZFpgvZlMl+WH4GCjS32CauMhD4bnUIeDQvK1UGtDeLvTdqljcCi97IAQBawLl4ISeA5jcP4a8c1a3HMwblsj+69UcunutIzm4BLB5PP9bcfv4G1iFO1spP+e7iueYyIqII3fIBAZVFLkB1iXkUHjhEOsbKtUo6JdSxX+pVbx6uvhGhEhLRI8g+kmuYF9KPnWKtILJEf29U0s4Q8T1vhVo5I8QLdpDyxLZI+yl/WNf5ak/LNy2tYkS/UBpSzlbVNGiV8TfKOCdPkEhWb+Ny2Dy0c+ob23a5eVFkvBcg6/jBAL0prf1kZA+s8pHzWRG5Ve02NsKgaWAnXkFqnyZ+Kj8AizoLYfk7oxLIfXkdq623d4GJHfGt0YA1wLZuodkAhsUQNfbMlGOAvB1oFgnuw54szOA/wGAoJRHR2vq3wAAAABJRU5ErkJggg==";
const robot2 =
	"data:image/png;base64,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";
const originalRobot =
	"data:image/png;base64,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";
const go_to_pin =
	"data:image/png;base64,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AAAOVWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNC40LjAtRXhpdjIiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iCiAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgeG1sbnM6R0lNUD0iaHR0cDovL3d3dy5naW1wLm9yZy94bXAvIgogICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgIHhtcE1NOkRvY3VtZW50SUQ9ImdpbXA6ZG9jaWQ6Z2ltcDplODk0ZjlkMy1iNjZlLTQ1ODQtODY0MS0zMGI5MTk2ZDM2NTQiCiAgIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6YjM1MWM4ODEtZmQwYi00MjlkLWExZDMtNjkwOTFiNWE1YzYxIgogICB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6YTZlMmNkZTctOGZhZC00ZDVhLWI5N2UtY2VhZTc0NWNmYjVmIgogICBkYzpGb3JtYXQ9ImltYWdlL3BuZyIKICAgR0lNUDpBUEk9IjIuMCIKICAgR0lNUDpQbGF0Zm9ybT0iV2luZG93cyIKICAgR0lNUDpUaW1lU3RhbXA9IjE2NzczNjQ5MzQzNDYyMjgiCiAgIEdJTVA6VmVyc2lvbj0iMi4xMC4zMiIKICAgdGlmZjpPcmllbnRhdGlvbj0iMSIKICAgeG1wOkNyZWF0b3JUb29sPSJHSU1QIDIuMTAiCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMjM6MDI6MjVUMjM6NDI6MTIrMDE6MDAiCiAgIHhtcDpNb2RpZnlEYXRlPSIyMDIzOjAyOjI1VDIzOjQyOjEyKzAxOjAwIj4KICAgPHhtcE1NOkhpc3Rvcnk+CiAgICA8cmRmOlNlcT4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0OmNoYW5nZWQ9Ii8iCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MjcxYWIyOGQtODExMy00NWRiLWJkMjQtNGJkOTJjZjk5NThmIgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJHaW1wIDIuMTAgKFdpbmRvd3MpIgogICAgICBzdEV2dDp3aGVuPSIyMDIzLTAyLTI1VDIzOjI1OjIzIi8+CiAgICAgPHJkZjpsaQogICAgICBzdEV2dDphY3Rpb249InNhdmVkIgogICAgICBzdEV2dDpjaGFuZ2VkPSIvIgogICAgICBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjA4MjZiNWE2LTgwZjctNDU2My1hY2UwLThjMTMzYjQyZmZhNCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iR2ltcCAyLjEwIChXaW5kb3dzKSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyMy0wMi0yNVQyMzo0MjoxNCIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz6W+nyxAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH5wIZFioOADz0AgAAAyVJREFUaN7tmr9uE0EQhz8ncmKSwglQkMSCIg0URMgFFUUkZARyj1DeIhQuIsQj0LqnJHkBK6FJ5QK5IIpBsuhiWVEiOY7y3/INxaybBOE9+27vbPknjWSfd2fmu/Xt7c4djDXWWGMNkRLhupcJ4CnwHHgNrADLwLxp0AT+AD+B78Ae8BsS3pCdR5kCeQPyA+QExAORHuaZtj9M36lhgX0FsmMB2Mt21Fd8QVMgGyA3AcB27cb4TMUNdgbkG0gnQNiudYzvmbjA3gPZDAH0tm1qrGhhJ0C+Wk5Kg5pnYk1ECfwB5NoBbNeuNWY0sPdBjhzCdu1IY7uFTYAUI4DtWlFzcAf8CKQeIXBdc/CvfieAt8Cinw6ZDBQKUC5Do6FWLuuxTMZ3/EWTg7MRrvgZkXxepFIR8Ty5I8/T3/J536NccQW7CHJpm9jKikitJj1Vq2lbH8CXmkv4wDk/y8dSSaxVKvleduZcXMNPgEmbhrkcZLP2jrNZ7WOpSZNL6MBztvvopSVIp+0dp9Pax8defs4F8LQtcCoFyaS942RS+/gAnnYBfAaITcOrK2i37R2329rHdjIxuYQOfAJYlWDqdWi17B23WtrHUp7JJfRZejVGs/SqC+CHIBcxuA9faC5uFh97MVhp7blcWq77XfBnMiKFgki5LNJoqJXLeiyT6WsDse4SeBnkPMLd0rnm4G63dAhUIyy1VE0OroATZ8BWhMBbJgenVY95kNMI/s6nGrs/DVABTDSBYgSjWzSxIynkPQNpOhzdpsbsXwPWeBO/gJLDM1wyMSMtxi+AtByMbktjDaYgqviH5lqWMM+qiXFIPCQLIMchju5xEKMbNPRaiMBrxE8yC7IbAuyu+o6lJAvSDhC2rT5jLfkU0IPxjvqKvWQOZD8A4H31NRSSFwNuH8/Vx9BIEuZlFK/PJ/0bjh+HBgI91eesvTtE72jdgX4McuAD9kD7DLXkvWVZ90bbjoTkc49bVUfbjIxkFmT7P8DbMV5N9Q39AKT6D9iq/jaSkpe39s4tPTbSknfmdYVL/exWEdzcZQL4aL58GcKXwccaa6yx3Okve0d25MUPGTcAAAAASUVORK5CYII=";

//const ctximg = canvasImg.getContext('2d');

const img = new Image(); // Create a new Image
img.src = originalRobot;

const img_charger = new Image();
img_charger.src = charger;

const obstacleTitles = {
	0: "Wire",
	1: "Pet waste",
	2: "Footwear",
	3: "Pedestal",
	4: "Pedestal",
	5: "Power strip",
	9: "Scale",
	10: "Fabric",
	18: "Dustpan",
	25: "Dustpan",
	26: "Bar",
	27: "Bar",
};

class MapCreator {
	constructor(adapter) {
		this.adapter = adapter;
		this.scaleFactor = adapter.config.map_scale;
	}

	getX(dimensions, px) {
		return (px * this.scaleFactor) % dimensions.width;
	}
	getY(dimensions, px) {
		return dimensions.height - Math.floor(px / (dimensions.width / this.scaleFactor)) * this.scaleFactor - this.scaleFactor;
	}

	robotXtoPixelX(image, robotCoord) {
		return (robotCoord - image.position.left) * this.scaleFactor - 2;
	}
	robotYtoPixelY(image, robotCoord) {
		return (image.dimensions.height / this.scaleFactor + image.position.top - robotCoord) * this.scaleFactor - 2;
	}

	rotateCanvas(img, angleInDegrees) {
		const canvasImg = createCanvas(img.width, img.height);
		const ctx = canvasImg.getContext("2d");
		const angleOffset = 90;
		let angleInRadians = ((angleInDegrees - angleOffset) * Math.PI) / 180;
		angleInRadians = ((angleInRadians + Math.PI) % (2 * Math.PI)) - Math.PI; // Normalize angle to -π to π

		ctx.translate(img.width / 2, img.height / 2);
		ctx.rotate(-angleInRadians);
		ctx.translate(-img.width / 2, -img.height / 2);
		ctx.drawImage(img, 0, 0);

		return canvasImg;
	}

	drawLineBresenham(imageData, x1, y1, x2, y2) {
		const pixels = imageData.data;

		const dx = Math.abs(x2 - x1);
		const dy = Math.abs(y2 - y1);
		const sx = x1 < x2 ? 1 : -1;
		const sy = y1 < y2 ? 1 : -1;
		let err = dx - dy;

		for(;;) {
			// Setze Pixel im ImageData
			if (x1 >= 0 && x1 < imageData.width && y1 >= 0 && y1 < imageData.height) { // handle out of bounds. lineto would already do this but we need to set pixels directly
				const index = (x1 + y1 * imageData.width) * 4;
				pixels[index] = 128;     // r
				pixels[index + 1] = 128; // g
				pixels[index + 2] = 128; // b
				pixels[index + 3] = 128; // a
			}

			if (x1 === x2 && y1 === y2) break;
			const e2 = 2 * err;
			if (e2 > -dy) {
				err -= dy;
				x1 += sx;
			}
			if (e2 < dx) {
				err += dx;
				y1 += sy;
			}
		}
	}

	areRoomsAdjacent(roomA, roomB) {
		const horizontalOverlap = roomA.minX <= roomB.maxX && roomA.maxX >= roomB.minX;
		const verticalOverlap = roomA.minY <= roomB.maxY && roomA.maxY >= roomB.minY;
		return horizontalOverlap && verticalOverlap;
	}

	hexToRGBA(hex, alpha = 1) {
		const r = parseInt(hex.slice(1, 3), 16);
		const g = parseInt(hex.slice(3, 5), 16);
		const b = parseInt(hex.slice(5, 7), 16);
		return `rgba(${r}, ${g}, ${b}, ${alpha})`;
	}

	canvasMap(mapdata, duid, selectedMap, mappedRooms, options) {
		if (options) {
			colors.floor = options.FLOORCOLOR;
			colors.obstacle = options.WALLCOLOR;
			colors.path = options.PATHCOLOR;
			colors.newmap = options && options.newmap ? options.newmap : true;
			if (options.ROBOT === "robot") {
				img.src = robot;
			} else if (options.ROBOT === "robot1") {
				img.src = robot1;
			} else if (options.ROBOT === "tank") {
				img.src = tank;
			} else if (options.ROBOT === "spaceship") {
				img.src = spaceship;
			} else if (options.ROBOT === "robot2") {
				img.src = robot2;
			} else if (options.ROBOT === "originalRobot") {
				img.src = originalRobot;
			}
		}
		let maxtop = 0;
		let maxleft = 0;
		let minleft = 0;
		let mintop = 0;

		mapdata.IMAGE.dimensions.width = mapdata.IMAGE.dimensions.width * this.scaleFactor;
		mapdata.IMAGE.dimensions.height = mapdata.IMAGE.dimensions.height * this.scaleFactor;

		const canvas = createCanvas(mapdata.IMAGE.dimensions.width, mapdata.IMAGE.dimensions.height);
		const ctx = canvas.getContext("2d");

		if (mapdata.IMAGE.pixels.floor && mapdata.IMAGE.pixels.floor.length !== 0) {
			if (typeof mapdata.IMAGE.pixels.floor[0] === "number") {
				// init min
				minleft = mapdata.IMAGE.pixels.floor[0] % mapdata.IMAGE.dimensions.width;
				mintop = mapdata.IMAGE.dimensions.height - 1 - Math.floor(mapdata.IMAGE.pixels.floor[0] / mapdata.IMAGE.dimensions.width);

				["floor", "obstacle"].forEach((key) => {
					ctx.beginPath();
					mapdata.IMAGE.pixels[key].forEach((px) => {
						if (key === "obstacle") {
							ctx.fillStyle = colors.newmap ? orgcolors[4] : colors.obstacle;
						} else {
							ctx.fillStyle = colors.newmap ? orgcolors[5] : colors.floor;
						}
						//ctx.fillStyle = colors[key];
						ctx.rect(this.getX(mapdata.IMAGE.dimensions, px), this.getY(mapdata.IMAGE.dimensions, px), this.scaleFactor, this.scaleFactor);

						maxtop = Math.max(maxtop, this.getY(mapdata.IMAGE.dimensions, px));
						maxleft = Math.max(maxleft, this.getX(mapdata.IMAGE.dimensions, px));
						minleft = Math.min(minleft, this.getX(mapdata.IMAGE.dimensions, px));
						mintop = Math.min(mintop, this.getY(mapdata.IMAGE.dimensions, px));
					});
					ctx.fill();
				});
			}
		}

		// Zeichne Alle Räume
		const segmentsData = {};
		const segmentsBounds = {};
		const assignedColors = {};
		const availableColors = [...orgcolors];

		if (mapdata.IMAGE.pixels.segments && !mapdata.CURRENTLY_CLEANED_BLOCKS && colors.newmap) {
			mapdata.IMAGE.pixels.segments.forEach((px) => {
				const segnum = (px >> 21);
				const x = this.getX(mapdata.IMAGE.dimensions, px & 0xfffff);
				const y = this.getY(mapdata.IMAGE.dimensions, px & 0xfffff);

				if (!segmentsData[segnum]) {
					segmentsData[segnum] = { points: [], minX: x, maxX: x, minY: y, maxY: y };
				} else {
					const segment = segmentsData[segnum];
					segment.points.push({ x, y });
					segment.minX = Math.min(segment.minX, x);
					segment.maxX = Math.max(segment.maxX, x);
					segment.minY = Math.min(segment.minY, y);
					segment.maxY = Math.max(segment.maxY, y);
				}
			});

			Object.keys(segmentsData).forEach(segnum => {
				const segment = segmentsData[segnum];
				segmentsBounds[segnum] = {
					minX: segment.minX,
					maxX: segment.maxX,
					minY: segment.minY,
					maxY: segment.maxY
				};
			});

			Object.keys(segmentsBounds).forEach(segnum => {
				const currentBounds = segmentsBounds[segnum];
				const adjacentSegments = Object.keys(segmentsBounds).filter(otherSegnum => {
					const otherBounds = segmentsBounds[otherSegnum];
					return segnum !== otherSegnum && this.areRoomsAdjacent(currentBounds, otherBounds);
				});

				const usedColors = adjacentSegments.map(adjSegnum => assignedColors[adjSegnum]);
				const availableColor = availableColors.find(color => !usedColors.includes(color));

				if (availableColor) {
					assignedColors[segnum] = availableColor;
				} else {
					assignedColors[segnum] = availableColors[Math.floor(Math.random() * availableColors.length)];
				}
			});

			Object.keys(segmentsData).forEach(segnum => {
				const segment = segmentsData[segnum];
				ctx.fillStyle = assignedColors[segnum] || availableColors[0];
				ctx.beginPath();
				segment.points.forEach(point => {
					ctx.rect(point.x, point.y, this.scaleFactor, this.scaleFactor);
				});
				ctx.fill();
			});

			ctx.closePath();
		}

		if (mapdata.CURRENTLY_CLEANED_BLOCKS && colors.newmap) {
			let segnum, lastcolor;
			ctx.beginPath();
			mapdata.IMAGE.pixels.segments.forEach((px) => {
				segnum = px >> 21;
				if (mapdata.CURRENTLY_CLEANED_BLOCKS.includes(segnum)) {
					if (segnum !== lastcolor) {
						ctx.fill();
						ctx.beginPath();
						ctx.fillStyle = orgcolors[segnum % 4];
						lastcolor = segnum;
					}
					px = px & 0xfffff;
					ctx.rect(this.getX(mapdata.IMAGE.dimensions, px), this.getY(mapdata.IMAGE.dimensions, px), this.scaleFactor, this.scaleFactor);
				}
			});
			ctx.fill();
			ctx.closePath();
		}

		// Zeichne Zonen active Zonen
		if (mapdata.CURRENTLY_CLEANED_ZONES) {
			if (mapdata.CURRENTLY_CLEANED_ZONES[0]) {
				ctx.beginPath();
				mapdata.CURRENTLY_CLEANED_ZONES.forEach((coord) => {
					ctx.fillStyle = "rgba(46,139,87,0.1)";
					ctx.fillRect(
						this.robotXtoPixelX(mapdata.IMAGE, coord[0] / 50),
						this.robotYtoPixelY(mapdata.IMAGE, coord[1] / 50),
						this.robotXtoPixelX(mapdata.IMAGE, coord[2] / 50) - this.robotXtoPixelX(mapdata.IMAGE, coord[0] / 50),
						this.robotYtoPixelY(mapdata.IMAGE, coord[3] / 50) - this.robotYtoPixelY(mapdata.IMAGE, coord[1] / 50)
					);
					ctx.strokeStyle = "#2e8b57";
					ctx.lineWidth = 4;
					ctx.strokeRect(
						this.robotXtoPixelX(mapdata.IMAGE, coord[0] / 50),
						this.robotYtoPixelY(mapdata.IMAGE, coord[1] / 50),
						this.robotXtoPixelX(mapdata.IMAGE, coord[2] / 50) - this.robotXtoPixelX(mapdata.IMAGE, coord[0] / 50),
						this.robotYtoPixelY(mapdata.IMAGE, coord[3] / 50) - this.robotYtoPixelY(mapdata.IMAGE, coord[1] / 50)
					);
				});
			}
		}

		// Zeichne Teppich
		if (mapdata.CARPET_MAP) {
			const offset = 8 * this.scaleFactor;
			ctx.fillStyle = "rgba(0,0,0,0.5)";

			const imageData = ctx.getImageData(0, 0, mapdata.IMAGE.dimensions.width, mapdata.IMAGE.dimensions.height);
			mapdata.CARPET_MAP.forEach((px) => {
				const x2 = this.getX(mapdata.IMAGE.dimensions, px) - offset;
				const y1 = this.getY(mapdata.IMAGE.dimensions, px);
				const x1 = x2 + this.scaleFactor - 1;
				const y2 = y1 + this.scaleFactor - 1;

				this.drawLineBresenham(imageData, x1, y1, x2, y2);
			});

			// Zeichne das ganze ImageData auf einmal
			ctx.putImageData(imageData, 0, 0);
		}

		// Male den Wischpfad
		if (mapdata.PATH && mapdata.MOP_PATH) {
			const mopOffset = -12; // i dont know why this offset?? Maybe the value from the end
			if (mapdata.PATH.points && mapdata.PATH.points.length !== 0) {
				let startX, startY; // this is needed to avoid weird spikes in sharp corners! don't remove this ever!

				ctx.beginPath();
				ctx.lineWidth = 7 * this.scaleFactor; // 7 makes the mop path look the same as on the Roborock app
				ctx.lineCap = "round";
				ctx.strokeStyle = "rgba(255,255,255,0.2)";

				mapdata.PATH.points.forEach((coord, index) => {
					if (mapdata.MOP_PATH && mapdata.MOP_PATH[index + mopOffset] !== 0) {
						if (mapdata.MOP_PATH[index - 1 + mopOffset] === 0) {
							startX = this.robotXtoPixelX(mapdata.IMAGE, coord[0] / 50);
							startY = this.robotYtoPixelY(mapdata.IMAGE, coord[1] / 50);
							ctx.moveTo(startX, startY);
							if (mapdata.MOP_PATH[index + mopOffset] !== 1) {
								// see value 9 and 12 in mop_path both in front of charger
							}
						} else if (mapdata.MOP_PATH[index - 1 + mopOffset] === 1) {
							ctx.moveTo(startX, startY);
							ctx.lineTo(this.robotXtoPixelX(mapdata.IMAGE, coord[0] / 50), this.robotYtoPixelY(mapdata.IMAGE, coord[1] / 50));
							startX = this.robotXtoPixelX(mapdata.IMAGE, coord[0] / 50);
							startY = this.robotYtoPixelY(mapdata.IMAGE, coord[1] / 50);
						}
					} else if (mapdata.MOP_PATH && mapdata.MOP_PATH[index + mopOffset] === 0) {
						if (mapdata.MOP_PATH[index - 1 + mopOffset] !== 0) {
							// do nothing ??
						}
					}
				});
				ctx.stroke();
				ctx.closePath();
			}
		}

		// Male den Pfad
		if (mapdata.PATH) {
			if (mapdata.PATH.points && mapdata.PATH.points.length !== 0) {
				ctx.fillStyle = colors.path;
				let first = true;
				let cold1, cold2;

				ctx.beginPath();
				mapdata.PATH.points.forEach((coord) => {
					if (first) {
						(cold1 = this.robotXtoPixelX(mapdata.IMAGE, coord[0] / 50)),
						(cold2 = this.robotYtoPixelY(mapdata.IMAGE, coord[1] / 50)),
						ctx.fillRect(cold1, cold2, (1 * this.scaleFactor) / 2, (1 * this.scaleFactor) / 2);
						first = false;
					} else {
						ctx.lineWidth = this.scaleFactor / 2;
						ctx.strokeStyle = colors.path;

						ctx.moveTo(cold1, cold2);
						(cold1 = this.robotXtoPixelX(mapdata.IMAGE, coord[0] / 50)), (cold2 = this.robotYtoPixelY(mapdata.IMAGE, coord[1] / 50)), ctx.lineTo(cold1, cold2);
						// ctx.stroke();
					}
				});
				ctx.stroke();
				ctx.closePath();
			}
		}

		// Male geplanten Pfad
		if (mapdata.GOTO_PREDICTED_PATH) {
			if (mapdata.GOTO_PREDICTED_PATH.points && mapdata.GOTO_PREDICTED_PATH.points.length !== 0) {
				let cold1, cold2;
				ctx.lineWidth = (3 * this.scaleFactor) / 2;
				ctx.strokeStyle = "rgba(255, 255, 255, 1)";
				ctx.setLineDash([3 * this.scaleFactor, 3 * this.scaleFactor]);
				ctx.lineCap = "round";
				ctx.beginPath();
				mapdata.GOTO_PREDICTED_PATH.points.forEach((coord, index) => {
					if (index === 0) {
						cold1 = this.robotXtoPixelX(mapdata.IMAGE, coord[0] / 50);
						cold2 = this.robotYtoPixelY(mapdata.IMAGE, coord[1] / 50);
						ctx.fillStyle = "rgba(255, 255, 255, 1)";
						ctx.fillRect(cold1, cold2, (1 * this.scaleFactor) / 2, (1 * this.scaleFactor) / 2);
						ctx.moveTo(cold1, cold2);
					} else {
						const newCold1 = this.robotXtoPixelX(mapdata.IMAGE, coord[0] / 50);
						const newCold2 = this.robotYtoPixelY(mapdata.IMAGE, coord[1] / 50);
						if (cold1 !== newCold1 || cold2 !== newCold2) {
							ctx.lineTo(newCold1, newCold2);
							cold1 = newCold1;
							cold2 = newCold2;
						}
					}
				});
				ctx.stroke();
				ctx.setLineDash([]);
				ctx.lineCap = "butt";
			}
		}

		if (mapdata.FORBIDDEN_ZONES) {
			mapdata.FORBIDDEN_ZONES.forEach((zone) => {
				const forbiddenMinX = Math.min(zone[0], zone[2], zone[4], zone[6]);
				const forbiddenMinY = Math.min(zone[1], zone[3], zone[5], zone[7]);
				const forbiddenMaxX = Math.max(zone[0], zone[2], zone[4], zone[6]);
				const forbiddenMaxY = Math.max(zone[1], zone[3], zone[5], zone[7]);

				const forbiddenSizeX = forbiddenMaxX - forbiddenMinX;
				const forbiddenSizeY = forbiddenMaxY - forbiddenMinY;

				ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
				ctx.fillRect(
					this.robotXtoPixelX(mapdata.IMAGE, forbiddenMinX / 50),
					this.robotYtoPixelY(mapdata.IMAGE, forbiddenMaxY / 50),
					(forbiddenSizeX / 50) * this.scaleFactor,
					(forbiddenSizeY / 50) * this.scaleFactor
				);
				ctx.lineWidth = (1 * this.scaleFactor) / 2;
				ctx.strokeStyle = "rgba(255, 0, 0, 1)";
				ctx.strokeRect(
					this.robotXtoPixelX(mapdata.IMAGE, forbiddenMinX / 50),
					this.robotYtoPixelY(mapdata.IMAGE, forbiddenMaxY / 50),
					(forbiddenSizeX / 50) * this.scaleFactor,
					(forbiddenSizeY / 50) * this.scaleFactor
				);
			});
		}

		if (mapdata.VIRTUAL_WALLS) {
			mapdata.VIRTUAL_WALLS.forEach((wall) => {
				const startX = this.robotXtoPixelX(mapdata.IMAGE, wall[0] / 50) + this.scaleFactor;
				const startY = this.robotYtoPixelY(mapdata.IMAGE, wall[1] / 50) + this.scaleFactor;
				const endX = this.robotXtoPixelX(mapdata.IMAGE, wall[2] / 50) + this.scaleFactor;
				const endY = this.robotYtoPixelY(mapdata.IMAGE, wall[3] / 50) + this.scaleFactor;

				// Calculate start end end of vector
				let vecX = endX - startX;
				let vecY = endY - startY;

				// Normalize vector
				const len = Math.sqrt(vecX * vecX + vecY * vecY);
				vecX /= len;
				vecY /= len;

				// Line width
				const lineWidth = 1 * this.scaleFactor;

				// Adjust start and end of the line
				const adjustedStartX = startX + vecX * (lineWidth / 2);
				const adjustedStartY = startY + vecY * (lineWidth / 2);
				const adjustedEndX = endX - vecX * (lineWidth / 2);
				const adjustedEndY = endY - vecY * (lineWidth / 2);

				ctx.lineWidth = lineWidth;
				ctx.strokeStyle = "rgba(255, 0, 0, 1)";

				ctx.beginPath();
				ctx.moveTo(adjustedStartX, adjustedStartY);
				ctx.lineTo(adjustedEndX, adjustedEndY);
				ctx.stroke();
			});
		}

		if (mapdata.NO_MOP_ZONE) {
			mapdata.NO_MOP_ZONE.forEach((zone) => {
				const noMopMinX = Math.min(zone[0], zone[2], zone[4], zone[6]);
				const noMopMinY = Math.min(zone[1], zone[3], zone[5], zone[7]);
				const noMopMaxX = Math.max(zone[0], zone[2], zone[4], zone[6]);
				const noMopMaxY = Math.max(zone[1], zone[3], zone[5], zone[7]);

				const noMopSizeX = noMopMaxX - noMopMinX;
				const noMopSizeY = noMopMaxY - noMopMinY;

				ctx.fillStyle = "rgba(0, 0, 255, 0.5)";
				ctx.fillRect(
					this.robotXtoPixelX(mapdata.IMAGE, noMopMinX / 50),
					this.robotYtoPixelY(mapdata.IMAGE, noMopMaxY / 50),
					(noMopSizeX / 50) * this.scaleFactor,
					(noMopSizeY / 50) * this.scaleFactor
				);
				ctx.lineWidth = (1 * this.scaleFactor) / 2;
				ctx.strokeStyle = "rgba(0, 0, 255, 1)";
				ctx.strokeRect(
					this.robotXtoPixelX(mapdata.IMAGE, noMopMinX / 50),
					this.robotYtoPixelY(mapdata.IMAGE, noMopMaxY / 50),
					(noMopSizeX / 50) * this.scaleFactor,
					(noMopSizeY / 50) * this.scaleFactor
				);
			});
		}

		if (mapdata.OBSTACLES2) {
			mapdata.OBSTACLES2.forEach((obstacle) => {
				const obstacleType = obstacle[2];
				const obstacleTitle = obstacleTitles[obstacleType] || "Unknown";
				const obstacleConfidence = Math.round(obstacle[3] / 100);
				const obstacleText = obstacleTitle[obstacleType] ? obstacleTitle + "(" + obstacleConfidence + "%)" : obstacleTitle;

				const x = this.robotXtoPixelX(mapdata.IMAGE, obstacle[0] / 50);
				const y = this.robotYtoPixelY(mapdata.IMAGE, obstacle[1] / 50);

				ctx.fillStyle = "red";
				ctx.beginPath();
				ctx.arc(x, y, 5, 0, 2 * Math.PI);
				ctx.fill();

				// Set the text properties
				ctx.font = "14px sans-serif";
				ctx.fillStyle = "white";
				ctx.textBaseline = "middle";
				ctx.textAlign = "center";

				// Calculate the text width and height
				const textWidth = ctx.measureText(obstacleText).width;
				const textHeight = parseInt(ctx.font, 10);

				// Calculate the position and dimensions of the background rectangle
				const padding = 5;
				const borderRadius = 5;
				const rectX = x - textWidth / 2 - padding;
				const rectY = y + 5 + padding / 2;
				const rectWidth = textWidth + 2 * padding;
				const rectHeight = textHeight + padding;

				// Draw the background rectangle with rounded corners
				ctx.fillStyle = "red";
				ctx.beginPath();
				ctx.moveTo(rectX + borderRadius, rectY);
				ctx.lineTo(rectX + rectWidth - borderRadius, rectY);
				ctx.quadraticCurveTo(rectX + rectWidth, rectY, rectX + rectWidth, rectY + borderRadius);
				ctx.lineTo(rectX + rectWidth, rectY + rectHeight - borderRadius);
				ctx.quadraticCurveTo(rectX + rectWidth, rectY + rectHeight, rectX + rectWidth - borderRadius, rectY + rectHeight);
				ctx.lineTo(rectX + borderRadius, rectY + rectHeight);
				ctx.quadraticCurveTo(rectX, rectY + rectHeight, rectX, rectY + rectHeight - borderRadius);
				ctx.lineTo(rectX, rectY + borderRadius);
				ctx.quadraticCurveTo(rectX, rectY, rectX + borderRadius, rectY);
				ctx.closePath();
				ctx.fill();

				// Draw the white text centered within the background rectangle
				ctx.fillStyle = "white";
				ctx.fillText(obstacleText, x, y + 5 + padding + textHeight / 2);
			});
		}

		// Zeichne Ladestation wenn vorhanden
		if (mapdata.CHARGER_LOCATION) {
			if (mapdata.CHARGER_LOCATION.position[0] && mapdata.CHARGER_LOCATION.position[1]) {
				ctx.beginPath();
				const img_charger_rotated = this.rotateCanvas(img_charger, mapdata.CHARGER_LOCATION.angle);
				ctx.drawImage(
					img_charger_rotated,
					this.robotXtoPixelX(mapdata.IMAGE, mapdata.CHARGER_LOCATION.position[0] / 50) - img_charger_rotated.width / 2,
					this.robotYtoPixelY(mapdata.IMAGE, mapdata.CHARGER_LOCATION.position[1] / 50) - img_charger_rotated.height / 2,
					img_charger_rotated.width,
					img_charger_rotated.height
				);
			}
		}

		// Zeichne Roboter
		if (mapdata.ROBOT_POSITION) {
			if (mapdata.PATH.current_angle && mapdata.ROBOT_POSITION[0] && mapdata.ROBOT_POSITION[1]) {
				ctx.beginPath();
				const canvasImg = this.rotateCanvas(img, mapdata.PATH.current_angle);
				ctx.drawImage(
					canvasImg,
					this.robotXtoPixelX(mapdata.IMAGE, mapdata.ROBOT_POSITION.position[0] / 50) - img.width / 4,
					this.robotYtoPixelY(mapdata.IMAGE, mapdata.ROBOT_POSITION.position[1] / 50) - img.height / 4,
					canvasImg.width / 2,
					canvasImg.height / 2
				);
			} else {
				const img_robot_rotated = this.rotateCanvas(img, mapdata.ROBOT_POSITION.angle);
				ctx.drawImage(
					img_robot_rotated,
					this.robotXtoPixelX(mapdata.IMAGE, mapdata.ROBOT_POSITION.position[0] / 50) - img_robot_rotated.width / 4,
					this.robotYtoPixelY(mapdata.IMAGE, mapdata.ROBOT_POSITION.position[1] / 50) - img_robot_rotated.height / 4,
					img_robot_rotated.width / 2,
					img_robot_rotated.height / 2
				);
			}
		}

		// Zeichne Zielposition wenn vorhanden
		if (mapdata.GOTO_TARGET) {
			const go_to_pin_img = new Image();
			go_to_pin_img.src = go_to_pin;

			if (mapdata.GOTO_TARGET[0] && mapdata.GOTO_TARGET[1]) {
				ctx.beginPath();
				ctx.drawImage(
					go_to_pin_img,
					this.robotXtoPixelX(mapdata.IMAGE, mapdata.GOTO_TARGET[0] / 50) - go_to_pin_img.width / 2,
					this.robotYtoPixelY(mapdata.IMAGE, mapdata.GOTO_TARGET[1] / 50) - (go_to_pin_img.height + 6),
					go_to_pin_img.width,
					go_to_pin_img.height
				);
			}
		}

		// Draw room names with background
		ctx.beginPath();
		Object.keys(segmentsData).forEach((segnum) => {
			const segment = segmentsData[segnum];

			let roomName = "";

			if (typeof selectedMap != "undefined") {
				// cannot get room name if map is from map history

				for (const mappedRoom of mappedRooms) {
					const segmentID = mappedRoom[0];
					const roomID = mappedRoom[1];

					if (segmentID == segnum) {
						roomName = this.adapter.roomIDs[roomID];
						break;
					}
				}

				if (roomName != "") {
					const centerX = segment.minX + (segment.maxX - segment.minX) / 2;
					const centerY = segment.minY + (segment.maxY - segment.minY) / 2;

					ctx.font = "bold 16px Arial";
					const textWidth = ctx.measureText(roomName).width;
					const textHeight = 16;
					const padding = 10;
					const backgroundWidth = textWidth + 2 * padding;
					const backgroundHeight = textHeight + 2 * padding;

					// fake square for shadow
					const imgdata = ctx.getImageData(centerX - backgroundWidth / 2, centerY - backgroundHeight / 2, backgroundWidth, backgroundHeight);
					ctx.shadowOffsetX = 4;
					ctx.shadowOffsetY = 4;
					ctx.shadowBlur = 5;
					ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
					ctx.fillStyle = "rgba(0, 0, 0, 0)";
					ctx.fillRect(centerX - backgroundWidth / 2, centerY - backgroundHeight / 2, backgroundWidth, backgroundHeight);
					ctx.putImageData(imgdata, centerX - backgroundWidth / 2, centerY - backgroundHeight / 2);

					// draw actual square over fake square to have a sharp shadow
					ctx.shadowColor = "transparent";
					ctx.fillStyle = this.hexToRGBA(assignedColors[segnum], 0.75);
					ctx.fillRect(centerX - backgroundWidth / 2, centerY - backgroundHeight / 2, backgroundWidth, backgroundHeight);

					ctx.fillStyle = "black";
					ctx.textAlign = "center";
					ctx.textBaseline = "middle";
					ctx.fillText(roomName, centerX, centerY);
				}
			}
		});
		ctx.closePath();

		// crop image
		const canvas_trimmed = createCanvas(maxleft - minleft + 2 * offset, maxtop - mintop + 2 * offset);
		const ctx_trimmed = canvas_trimmed.getContext("2d");
		const trimmed = ctx.getImageData(minleft - offset, mintop - offset, maxleft - minleft + 2 * offset, maxtop - mintop + offset);

		ctx_trimmed.putImageData(trimmed, 0, 0);

		return [canvas.toDataURL(), canvas_trimmed.toDataURL()];
	}
}

module.exports = MapCreator;
